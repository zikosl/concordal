import axios, { AxiosInstance } from "axios";
import { stringify } from "query-string";
import {
    DataProvider,
    HttpError,
    CrudOperators,
    CrudFilters,
    CrudSorting,
} from "@pankod/refine-core";
import warnOnce from "warn-once";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const mapOperator = (operator) => {
    switch (operator) {
        case "ne":
        case "gte":
        case "lte":
            return `_${operator}`;
        case "contains":
            return "_like";
        case "eq":
        default:
            return "";
    }
};

const generateSort = (sort) => {
    if (sort && sort.length > 0) {
        const _sort = [];
        const _order = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });

        return {
            _sort,
            _order,
        };
    }

    return;
};

const generateFilter = (filters) => {
    const queryFilters = {};

    if (filters) {
        filters.map((filter) => {
            if (filter.operator === "or" || filter.operator === "and") {
                throw new Error(
                    `[@pankod/refine-simple-rest]: \`operator: ${filter.operator}\` is not supported. You can create custom data provider. https://refine.dev/docs/api-reference/core/providers/data-provider/#creating-a-data-provider`,
                );
            }

            if ("field" in filter) {
                const { field, operator, value } = filter;

                if (field === "q") {
                    queryFilters[field] = value;
                    return;
                }

                const mappedOperator = mapOperator(operator);
                queryFilters[`${field}${mappedOperator}`] = value;
            }
        });
    }

    return queryFilters;
};

const JsonServer = (
    apiUrl,
    httpClient = axiosInstance,
)=> ({
    getList: async ({
        resource,
        hasPagination = true,
        pagination = { current: 1, pageSize: 10 },
        filters,
        sort,
    }) => {
        const url = `${apiUrl}/${resource}`;

        const { current = 1, pageSize = 10 } = pagination ?? {};

        const queryFilters = generateFilter(filters);

        const query  = hasPagination
            ? {
                  _start: (current - 1) * pageSize,
                  _end: current * pageSize,
              }
            : {};

        const generatedSort = generateSort(sort);
        if (generatedSort) {
            const { _sort, _order } = generatedSort;
            query._sort = _sort.join(",");
            query._order = _order.join(",");
        }

        const { data, headers } = await httpClient.get(
            `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        );

        const total = +headers["x-total-count"];

        return {
            data,
            total,
        };
    },

    getMany: async ({ resource, ids }) => {
        const { data } = await httpClient.get(
            `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        );

        return {
            data,
        };
    },

    create: async ({ resource, variables }) => {
        const url = `${apiUrl}/${resource}`;

        const { data } = await httpClient.post(url, variables);

        return {
            data,
        };
    },

    update: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.patch(url, variables);

        return {
            data,
        };
    },

    getOne: async ({ resource, id }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.get(url);

        return {
            data,
        };
    },

    deleteOne: async ({ resource, id, variables }) => {
        const url = `${apiUrl}/${resource}/${id}`;

        const { data } = await httpClient.delete(url, {
            data: variables,
        });

        return {
            data,
        };
    },

    getApiUrl: () => {
        return apiUrl;
    },

    custom: async ({ url, method, filters, sort, payload, query, headers }) => {
        let requestUrl = `${url}?`;

        if (sort) {
            const generatedSort = generateSort(sort);
            if (generatedSort) {
                const { _sort, _order } = generatedSort;
                const sortQuery = {
                    _sort: _sort.join(","),
                    _order: _order.join(","),
                };
                requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
            }
        }

        if (filters) {
            const filterQuery = generateFilter(filters);
            requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
        }

        if (query) {
            requestUrl = `${requestUrl}&${stringify(query)}`;
        }

        if (headers) {
            httpClient.defaults.headers = {
                ...httpClient.defaults.headers,
                ...headers,
            };
        }

        let axiosResponse;
        switch (method) {
            case "put":
            case "post":
            case "patch":
                axiosResponse = await httpClient[method](url, payload);
                break;
            case "delete":
                axiosResponse = await httpClient.delete(url, {
                    data: payload,
                });
                break;
            default:
                axiosResponse = await httpClient.get(requestUrl);
                break;
        }

        const { data } = axiosResponse;

        return Promise.resolve({ data });
    },
});

export default JsonServer;
