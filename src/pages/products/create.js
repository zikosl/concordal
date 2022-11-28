import React, { useState } from "react";
import {
    Create,
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

export const ProductCreate = () => {
    const { formProps, saveButtonProps} = useForm();

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
    
    const apiUrl = useApiUrl();
    const onFinish = async (values) => {
        const { photo } = values;


        return (
            formProps.onFinish &&
            formProps.onFinish({
                ...values,
                photo: photo[0].response,
            })
        );
    }
    return (
        <Create saveButtonProps={saveButtonProps}>
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
                <Form.Item label="Image"
                    name="photo"
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
                {/* <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        options={[
                            {
                                label: "Published",
                                value: "published",
                            },
                            {
                                label: "Draft",
                                value: "draft",
                            },
                            {
                                label: "Rejected",
                                value: "rejected",
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <MDEditor data-color-mode="light" />
                </Form.Item> */}
            </Form>
        </Create>
    );
};
