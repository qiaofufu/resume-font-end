
import {Button, Form, Input, Space, Typography} from "antd";
import styles from "./ContactForm.module.css";
import {IconFont} from "tdesign-icons-react";
import {Elem} from "../../model";

export function SkillForm({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()
    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }
    return (
        <Form
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item name={"type"} initialValue={"skill"} hidden/>
            <Form.Item name={"name"} initialValue={"专业技能"}>
                <Input/>
            </Form.Item>
            <Form.Item name={"icon"} initialValue={"code"}>
                <Input/>
            </Form.Item>
            <Form.List name={"data"}>
                {
                    (fields, {add, remove}) => (
                        <>
                            {fields.map((field)=>(
                                <Space className={styles.item} key={field.key}>
                                    <Form.Item name={[field.name, "type"]} initialValue={"skillItem"} hidden/>
                                    <Form.Item label={"内容行"} name={[field.name, "value"]}>
                                        <Input.TextArea />
                                    </Form.Item>
                                </Space>
                            ))}
                            <Button block onClick={()=>add()} className={styles.addBtn}>
                                <IconFont name={"add-circle"} />
                                <span>添加一项</span>
                            </Button>
                        </>
                    )
                }
            </Form.List>
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