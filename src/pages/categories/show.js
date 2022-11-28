import { useShow, useOne } from "@pankod/refine-core";

import { Show, Typography, MarkdownField } from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const CategorieShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;


    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.title}</Text>


            <Title level={5}>Reference</Title>
            <Text>{record?.ref}</Text>


        </Show>
    );
};
