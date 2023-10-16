import {Resume} from "../resume/Resume";
import styles from  "./Edit.module.css"
import {Button, Card, Drawer, FloatButton, Space} from "antd";
import {IconFont} from "tdesign-icons-react";
import {useRef, useState} from "react";
import {Form, Item} from "../form/Form";
import {Elem} from "../model";

export function Edit() {
    const [show, setShow] = useState(false)

    const onClose = () => {
        setShow(false)
    }

    const showDrawer = () => {
        setShow(true)
    }

    const [childData, setChildData] = useState<Elem[]>([]);

    const handleChildDataChange = (newData:Elem[]) => {
        setChildData(newData);
    };
    
    function handleSubmit() {
        console.log(childData)
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
                        <Button type={"primary"} onClick={handleSubmit}>Submit</Button>
                    </Space>
                }
            >
                <Card className={styles.resume} hoverable>
                    <Resume data={childData}/>
                </Card>

            </Drawer>
            <Card className={styles.form}>
                <Form dataChange={handleChildDataChange}/>
            </Card>
            <FloatButton className={styles.editBtn} shape={"square"} icon={<IconFont name={"edit-2"}/>} tooltip={<div>Edit resume</div>} onClick={showDrawer}></FloatButton>
        </div>
    )
}