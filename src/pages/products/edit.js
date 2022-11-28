import React, { useState } from "react";
import {
    Edit,
    Form,
    getValueFromEvent,
    Input,
    Select,
    Upload,
    useForm,
    useSelect,
} from "@pankod/refine-antd";

import MDEditor from "@uiw/react-md-editor";
import { useApiUrl } from "@pankod/refine-core";

export const ProductEdit = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const postData = queryResult?.data?.data;
    const apiUrl = useApiUrl();
    const { selectProps: categorySelectProps } = useSelect({
        resource: "categories",
        optionLabel: "name",
        optionValue: "id",
    });

    const { selectProps: colorSelectProps } = useSelect({
        resource: "colors",
        optionLabel: "name",
        optionValue: "id",
    });
    React.useEffect(()=>{
        if(postData){
            console.log("postData")
            queryResult.data.data.color=[]
        }
    },[postData?.color])
    // const { selectProps: categorySelectProps } = useSelect({
    //     resource: "categories",
    //     defaultValue: postData?.category.id,
    // });
    const onFinish = async (values) => {
        const { photo } = values;

        return (
            formProps.onFinish &&
            formProps.onFinish({
                ...values,
                photo: photo[0].response??photo[0].url,
            })
        );
    }

    console.log(formProps)
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical" onFinish={onFinish}>
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
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
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
                <Form.Item label="Image"
                    name="photo"
                    valuePropName="fileList"
                    getValueFromEvent={getValueFromEvent}
                    noStyle
                >
                    <Upload.Dragger
                        name="file"
                        action={`${apiUrl}/media/upload`}
                        listType="picture"
                        maxCount={1}
                        onChange={(e)=>console.log(e)}
                    >
                        <p className="ant-upload-text">
                            Drag & drop a file in this area
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="catId"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...categorySelectProps} />
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        {...colorSelectProps} />
                </Form.Item>
            </Form>
        </Edit>
    );
};
