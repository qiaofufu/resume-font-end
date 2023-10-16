import { Button, Form, Input } from "antd";
import styles from "./ContactForm.module.css";
import { IconFont } from "tdesign-icons-react";
import { useState } from "react";
import { ContactItem } from "../../model";

export function ContactForm() {
    const [contacts, setContacts] = useState<ContactItem[]>([]);

    const onAddItem = () => {
        setContacts((prevState) => {
                const newContact: ContactItem = {
                    type: "contactItem",
                    key: "eg. 手机号",
                    link: "eg. https://example.com",
                    value: "eg. 18547264730",
                    icon: "eg. phone-1 see more https://tdesign.tencent.com/react/components/icon#%E5%85%A8%E9%83%A8%E5%9B%BE%E6%A0%87",
                };
                return [...prevState, newContact];
            }
        );
        console.log(contacts);
    };
    const [form] = Form.useForm()
    return (
        <div>
            <Form
                form={form}
            >
                <Form.List name="data">
                    {
                        (fields, { add, remove }) => (
                            <div>
                                {fields.map((field)=>(
                                    <div className={styles.item} key={field.key}>
                                        <Form.Item label={"标签"} name={[field.name, "key"]}>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label={"内容"} name={[field.name, "value"]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label={"图标"} name={[field.name, "icon"]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label={"超链接"} name={[field.name, "link"]}>
                                            <Input />
                                        </Form.Item>
                                    </div>
                                ))}
                                <Button onClick={add} className={styles.addBtn}>
                                    <IconFont name={"add-circle"} />
                                    <span>添加一项</span>
                                </Button>
                            </div>
                        )
                    }
                </Form.List>

            </Form>

        </div>
    );
}
