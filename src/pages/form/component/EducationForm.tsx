import {Button, Form, Input, Space, Typography} from "antd";
import styles from "./ContactForm.module.css";
import {IconFont} from "tdesign-icons-react";
import {Elem} from "../../model";

export function EducationForm({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()
    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }
    return (
        <Form
            form={form}
            onValuesChange={handleValuesChange}
        >
            <Form.Item name={"type"} initialValue={"education"} hidden/>
            <Form.List name={"data"}>
                {
                    (fields, {add, remove}) => (
                        <div>
                            {fields.map((field)=>(
                                <Space  key={field.key}>
                                    <Form.Item name={[field.name,"type"]} initialValue={"educationItem"} hidden/>
                                    <Form.Item label={"学校名称"} name={[field.name, "name"]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={"学校类别"} name={[field.name, "degree"]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={"专业"} name={[field.name, "major"]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={"时间"} name={[field.name, "duration"]}>
                                        <Input/>
                                    </Form.Item>
                                </Space>
                            ))}
                            <Button block onClick={()=>add()} className={styles.addBtn}>
                                <IconFont name={"add-circle"} />
                                <span>添加一项</span>
                            </Button>
                        </div>
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