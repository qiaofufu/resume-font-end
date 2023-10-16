import {Resume} from "../resume/Resume";
import styles from  "./Edit.module.css"
import {Button, Card, Drawer, FloatButton, Space} from "antd";
import {IconFont} from "tdesign-icons-react";
import {useState} from "react";
import {Form} from "../form/Form";

export function Edit() {
    const [show, setShow] = useState(false)

    const onClose = () => {
        setShow(false)
    }

    const showDrawer = () => {
        setShow(true)
    }

    return (
        <div className={styles.container}>
            <Drawer
                placement={"left"}
                width={"50%"}
                onClose={onClose}
                open={show}
                extra={
                    <Space>
                        <Button>Cancel</Button>
                        <Button type={"primary"}>Submit</Button>
                    </Space>
                }
            >
                <Card>
                   <Form/>
                </Card>
            </Drawer>
            <Card className={styles.resume} hoverable>
                <Resume/>
            </Card>
            <FloatButton className={styles.editBtn} shape={"square"} icon={<IconFont name={"edit-2"}/>} tooltip={<div>Edit resume</div>} onClick={showDrawer}></FloatButton>
        </div>
    )
}