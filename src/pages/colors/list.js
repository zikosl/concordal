import { useMany } from "@pankod/refine-core";

import {
    List,
    Table,
    TextField,
    useTable,
    Space,
    EditButton,
    ShowButton,
} from "@pankod/refine-antd";

export const Color = () => {
    const { tableProps } = useTable();
    console.log(tableProps)
    // const categoryIds =
    //     tableProps?.dataSource?.map((item) => item.category.id) ?? [];
    // const { data, isLoading } = useMany({
    //     resource: "categories",
    //     ids: categoryIds,
    //     queryOptions: {
    //         enabled: categoryIds.length > 0,
    //     },
    // });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column
                    dataIndex="id"
                    title="ID"
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex="name"
                    title="Title"
                    render={(value) => <TextField value={value} />}
                />
                 <Table.Column
                    dataIndex="code"
                    title="Code"
                    render={(value) => <TextField value={value} />}
                />
                 <Table.Column
                    dataIndex="ref"
                    title="Reference"
                    render={(value) => <TextField value={value} />}
                />
                {/* <Table.Column
                    dataIndex={["category", "id"]}
                    title="Category"
                    render={(value) => {
                        if (isLoading) {
                            return <TextField value="Loading..." />;
                        }

                        return (
                            <TextField
                                value={
                                    data?.data.find((item) => item.id === value)
                                        ?.title
                                }
                            />
                        );
                    }}
                /> */}
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record) => {
                        console.log(record.id)
                        return (
                            <Space>
                                <EditButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                                <ShowButton
                                    hideText
                                    size="small"
                                    recordItemId={record.id}
                                />
                            </Space>
                        )
                    }}
                />
            </Table>
        </List>
    );
};
