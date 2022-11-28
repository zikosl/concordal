import React, { useState } from "react";
import {
    Col,
    Edit,
    Form,
    Input,
    Row,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";

export const ColorEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    
    //console.log(formProps)
    // const { selectProps: categorySelectProps } = useSelect({
    //     resource: "categories",
    //     defaultValue: postData?.category.id,
    // });
    const [bg,setBg] = useState("")
    React.useEffect(()=>{
        const postData = queryResult?.data?.data;
        if(postData){
            setBg(postData.code)
        }
    },[queryResult.data])
    return (
        <Edit saveButtonProps={saveButtonProps}>
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
                     <Input style={{background:`#${bg}`}} onChange={(e)=>setBg(e.target.value)} maxLength={6}/>
                    
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
        </Edit>
    );
};
