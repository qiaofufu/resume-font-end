import {Button, Card, Form, Input, Space, Typography} from "antd";
import styles from "./ContactForm.module.css";
import {IconFont} from "tdesign-icons-react";
import {Elem} from "../../model";

export function ExperienceForm({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()
    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }
    return (
        <Form
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item name={"type"} initialValue={"experience"} hidden/>
            <Form.Item label={"label"} name={"name"} initialValue={"实习经历"}>
                <Input/>
            </Form.Item>
            <Form.Item label={"icon"} name={"icon"} initialValue={"home"}>
                <Input/>
            </Form.Item>
            <Form.Item>
                <Form.List name={"data"}>
                    {
                        (fields,opt) => (
                            <>
                                {fields.map((field)=>(
                                    <Card key={field.key}>
                                        <Form.Item name={[field.name, "type"]} initialValue={"experienceItem"} hidden/>
                                        <Form.Item label={"公司名称"} name={"name"} >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label={"就职时间"} name={"duration"} >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label={"职位"} name={"position"} >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label={"具体内容"}>
                                            <Form.List name={[field.name, "responsibility"]}>
                                                {(subFields,subOpt) => (
                                                    <>
                                                        {subFields.map((subField)=>(
                                                            <div key={subField.key}>
                                                                <Form.Item name={[subField.name, "type"]} initialValue={"responsibilityItem"} hidden/>
                                                                <Form.Item name={[subField.name, "value"]}>
                                                                    <Input/>
                                                                </Form.Item>
                                                            </div>
                                                        ))}
                                                        <Form.Item>
                                                            <Button block onClick={() => subOpt.add()}>添加具体内容行</Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    </Card>
                                ))}
                                <Button block onClick={()=>opt.add()} className={styles.addBtn}>
                                    <IconFont name={"add-circle"} />
                                    <span>添加一项</span>
                                </Button>
                            </>
                        )
                    }
                </Form.List>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
                {() => (
                    <Typography>
                        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                    </Typography>
                )}
            </Form.Item>
        </Form>
    )
}