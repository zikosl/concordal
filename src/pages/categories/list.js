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

export const Categorie = () => {
    const { tableProps } = useTable();


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
                    dataIndex="ref"
                    title="Reference"
                    render={(value) => <TextField value={value} />}
                />
                
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
