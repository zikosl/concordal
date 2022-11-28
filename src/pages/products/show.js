import { useShow, useOne } from "@pankod/refine-core";

import { Show, Typography, MarkdownField, Image } from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const ProductShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    // const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    //     resource: "categories",
    //     id: record?.category.id || "",
    //     queryOptions: {
    //         enabled: !!record,
    //     },
    // });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>
            <Title level={5}>Image</Title>
            <Image
                width={200}
                src={record?.photo[0].url}
            />
            <Title level={5}>Title</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Description</Title>
            <Text>{record?.description}</Text>

            <Title level={5}>Reference</Title>
            <Text>{record?.ref}</Text>
            
            {/* <Title level={5}>Category</Title>
            <Text>
                {categoryIsLoading ? "Loading..." : categoryData?.data.title}
            </Text>

            <Title level={5}>Content</Title>
            <MarkdownField value={record?.content} /> */}
        </Show>
    );
};
