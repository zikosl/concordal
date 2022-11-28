import { useShow, useOne } from "@pankod/refine-core";

import { Show, Typography, MarkdownField } from "@pankod/refine-antd";

const { Title, Text } = Typography;

export const ColorShow = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;
    const record = data?.data;

    return (
        <Show isLoading={isLoading}> 
            <Title level={5}>Id</Title>
            <Text>{record?.id}</Text>

            <Title level={5}>Title</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>Color</Title>
            <Text>{record?.code}</Text>

            <Title level={5}>Reference</Title>
            <Text>{record?.ref}</Text>
        </Show>
    );
};
