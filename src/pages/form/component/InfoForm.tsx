import {Input, Form} from "antd";

export function InfoForm() {
    return (
        <Form>
            <Form.Item label={"姓名"}>
                <Input/>
            </Form.Item>
        </Form>
    )
}