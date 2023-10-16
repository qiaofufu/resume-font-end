import { Button, Form, Input, Typography } from "antd";
import styles from "./ContactForm.module.css";
import { IconFont } from "tdesign-icons-react";
import {Elem} from "../../model";
export function ProjectForm({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()
    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }
    return (
        <Form
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item name={"type"} initialValue={"project"} hidden/>
            <Form.Item name={"name"} initialValue={"项目经历"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"icon"} initialValue={"folder-minus"}>
                <Input/>
            </Form.Item>
            <Form.List name="data">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({key, name, ...restField})=>(
                            <div key={key}>
                                <Form.Item name={[name, "type"]} initialValue={"projectItem"} hidden/>
                                <Form.Item

                                    label={"项目名称"}
                                    name={[name, "name"]}
                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"开发时间"}
                                    name={[name, "duration"]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"链接"}
                                    name={[name, "link"]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"开发角色"}
                                    name={[name, "role"]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"项目概述"}
                                    name={[name, "overview"]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"主要工作"}
                                >
                                    <Form.List name={[name,"responsibility"]}>
                                        {(fields,{add, remove}) => (
                                            <>
                                                {fields.map((field)=>(
                                                    <>
                                                        <Form.Item name={[field.name, "type"]} initialValue={"responsibilityItem"} hidden/>
                                                        <Form.Item name={[field.name, "value"]}>
                                                            <Input/>
                                                        </Form.Item>
                                                    </>
                                                ))}
                                                <Form.Item>
                                                    <Button block onClick={() => add()}>add</Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    label={"项目总结"}
                                >
                                    <Form.List
                                        name={[name, "summary"]}
                                    >
                                        {(fields,{add, remove}) => (
                                            <>
                                                {fields.map((field)=>(
                                                    <>
                                                        <Form.Item name={[field.name, "type"]} initialValue={"responsibilityItem"} hidden/>
                                                        <Form.Item name={[field.name, "value"]}>
                                                            <Input/>
                                                        </Form.Item>
                                                    </>
                                                ))}
                                                <Form.Item>
                                                    <Button block onClick={() => add()}>add</Button>
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </div>
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
        </Form>
    );
}
