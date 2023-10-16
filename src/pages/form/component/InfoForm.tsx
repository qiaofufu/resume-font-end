import {Input, Form, Typography, Button} from "antd";
import {Elem} from "../../model";

export function InfoForm({onChange}:{onChange: (elem:Elem)=>void}) {
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
                initialValue={"info"}
                hidden
            />
            <Form.Item
                label={"姓名"}
                name={"name"}
            >
                <Input/>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
                {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                )}
            </Form.Item>
            <Button onClick={()=>{console.log(form.getFieldsValue())}}>P</Button>
        </Form>
    )
}