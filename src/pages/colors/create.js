import React, { useState } from "react";
import {
    Col,
    Create,
    Form,
    Input,
    Row,
    Select,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

export const ColorCreate = () => {
    const { formProps, saveButtonProps } = useForm();
    const [bg,setBg] = useState("000000")
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
    });
    
    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Code"
                    name="code"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Row>
                        <Col span={20}>
                            <Input onChange={(e)=>setBg(e.target.value)} maxLength={6} minLength={6}/>
                        </Col>
                        <Col span={4}>
                            <div style={{background:`#${bg}`,width:"calc(100% - 1em)",height:'calc(100% - 5px)',marginTop:"2.5px",borderRadius:3,marginLeft:"1em"}}>
                            </div>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item
                    label="Reference"
                    name="ref"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
