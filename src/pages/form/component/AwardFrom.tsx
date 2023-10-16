import {Button, Form, Input, Typography} from "antd";
import styles from "./ContactForm.module.css";
import {IconFont} from "tdesign-icons-react";
import {Elem} from "../../model";

export function AwardFrom({onChange}:{onChange: (elem:Elem)=>void}) {
    const [form] = Form.useForm()

    function handleValuesChange() {
        onChange(form.getFieldsValue())
    }

    return (
        <Form form={form} onValuesChange={handleValuesChange}>
            <Form.Item name={"type"} initialValue={"award"} hidden/>
            <Form.Item label={"标题名称"} name={"name"} initialValue={"获奖情况"}>
                <Input/>
            </Form.Item>
            <Form.Item label={"图标"} name={"icon"} initialValue={"giggle"}>
                <Input/>
            </Form.Item>
            <Form.List name={"data"}>
                {
                    (fields, {add, remove}) => (
                        <>
                            {fields.map((field)=>(
                                <div className={styles.item} key={field.key}>
                                    <Form.Item name={[field.name, "type"]} initialValue={"awardItem"} hidden/>
                                    <Form.Item label={"奖项名称"} name={[field.name, "name"]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label={"获得时间"} name={[field.name, "time"]}>
                                        <Input />
                                    </Form.Item>
                                </div>
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