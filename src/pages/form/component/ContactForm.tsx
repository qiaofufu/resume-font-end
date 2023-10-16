import { Button, Form, Input, Space, Typography } from "antd";
import styles from "./ContactForm.module.css";
import { IconFont } from "tdesign-icons-react";
import {Elem} from "../../model";

export function ContactForm({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()
    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }
    return (
        <Form
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item
                name={"type"}
                initialValue={"contact"}
                hidden

            />
            <Form.Item>
                <Form.List name="data">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({key, name, ...restField})=>(
                                <Space key={key}>
                                    <Form.Item name={[name, "type"]} initialValue={"contactItem"} hidden/>
                                    <Form.Item

                                        label={"标签"}
                                        name={[name, "key"]}
                                    >
                                        <Input/>
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label={"内容"}
                                        name={[name, "value"]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label={"图标"}
                                        name={[name, "icon"]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label={"超链接"}
                                        name={[name, "link"]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button block onClick={()=>add()} className={styles.addBtn}>
                                    <IconFont name={"add-circle"} />
                                    <span>添加一项</span>
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                    )}
                </Form.Item>
            </Form.Item>
        </Form>
    );
}
