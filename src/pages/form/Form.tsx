import {closestCenter, DndContext, MouseSensor, PointerSensor, useSensor, useSensors,} from "@dnd-kit/core";
import {useEffect, useRef, useState} from "react";
import {Button, Card, Space} from "antd";
import {Block, Elem} from "../model"
import {SortableContext, useSortable, verticalListSortingStrategy} from "@dnd-kit/sortable";

import styles from "./Form.module.css"
import {IconFont} from "tdesign-icons-react";
import {ContactForm} from "./component/ContactForm";
import {InfoForm} from "./component/InfoForm";
import {EducationForm} from "./component/EducationForm"
import {SkillForm} from "./component/SkillForm";
import {ProjectForm} from "./component/ProjectForm";
import {ExperienceForm} from "./component/ExperienceForm";
import {AwardFrom} from "./component/AwardFrom";

export interface Item {
    id: number,
    data: Elem
}


export function Form(props:{dataChange:(data:Elem[]) => void}) {
    const [items, setItems] = useState([] as Item[]);
    const [cnt, setCnt] = useState(1)
    const childDataRef = useRef<Item[]>();

    useEffect(()=>{
        const data =items.map(item => {
            return item.data
        })
        props.dataChange(data)
    }, [items])

    function add(data:Elem) {
        setItems((prevState) => {
            const newItem = {id: cnt, data: data}
            setCnt(cnt + 1)
            return [...prevState, newItem] as Item[]
        })
    }

    function addBlock(type: string) {
        return () => add({type:type} as Block)
    }

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor, {
            activationConstraint: {
                tolerance: 5,
                delay: 250,
            },
        })
    );

    // 拖拽结束处理函数
    function handleDragEnd(event:any) {
        const {active, over} = event;
        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((elem)=>elem.id === active.id);
                const newIndex = items.findIndex((elem)=>elem.id === over.id);
                const newItems =  [...items]
                const t = newItems[oldIndex]
                newItems[oldIndex] = newItems[newIndex]
                newItems[newIndex] = t
                return newItems
            });
        }
    }

    function onChange(idx: number) {
        return (elem:Elem) => {
            setItems((items) => {
                const newItems = [...items]
                newItems[idx].data = elem
                return newItems
            })
        }
    }

    function onDelete(idx: number) {
        return () => {
            setItems((items) => {
                const newItems = [...items]
                return [...newItems.slice(0,idx), ...newItems.slice(idx + 1)]
            })
        }
    }

    return (
        <div>
            <Space>
                <Button onClick={addBlock("info")}>Info</Button>
                <Button onClick={addBlock("contact")}>Contact</Button>
                <Button onClick={addBlock("education")}>Education</Button>
                <Button onClick={addBlock("skill")}>Skill</Button>
                <Button onClick={addBlock("project")}>Project</Button>
                <Button onClick={addBlock("experience")}>Experience</Button>
                <Button onClick={addBlock("award")}>Award</Button>
            </Space>
            <DndContext
                         collisionDetection={closestCenter}
                         onDragEnd={handleDragEnd}
                         sensors={sensors}
            >
                <SortableContext items={items}  strategy={verticalListSortingStrategy}>
                    {items.map((elem, idx) => (
                        <SortItem key={elem.id} id={elem.id}>
                            {renderElem(elem.data, onChange(idx), onDelete(idx))}
                        </SortItem>
                    ))}
                </SortableContext>


            </DndContext>
        </div>

    );
}

function renderElem(elem: Elem, onChange: (elem: Elem) => void, onDelete: () => void) {
    switch (elem.type) {
        case "info": {
            return (
                <InputContainer label={"基本信息"} onDelete={onDelete}>
                    <InfoForm onChange={onChange}/>
                </InputContainer>
            )
        }
        case "contact": {
            return (
                <InputContainer label={"联系方式"} onDelete={onDelete}>
                    <ContactForm onChange={onChange}/>
                </InputContainer>
            )
        }
        case "education": {
            return (
                <InputContainer label={"教育背景"} onDelete={onDelete}>
                    <EducationForm onChange={onChange} />
                </InputContainer>
            )
        }
        case "skill": {
            return (
                <InputContainer label={"专业技能"} onDelete={onDelete}>
                    <SkillForm onChange={onChange} />
                </InputContainer>
            )
        }
        case "project": {
            return (
                <InputContainer label={"项目经历"} onDelete={onDelete}>
                    <ProjectForm onChange={onChange}/>
                </InputContainer>
            )
        }
        case "experience": {
            return (
                <InputContainer label={"工作/实习经历"} onDelete={onDelete}>
                    <ExperienceForm onChange={onChange}/>
                </InputContainer>
            )
        }
        case "award": {
            return (
                <InputContainer label={"获奖情况"} onDelete={onDelete}>
                    <AwardFrom onChange={onChange}/>
                </InputContainer>
            )
        }
    }
}

function SortItem(props:any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({id: props.id});

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        backgroundColor: isDragging ? 'lightblue' : 'transparent',
        transition,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
                {props.children}
        </div>
    );
}

function InputContainer(props:any) {
    return (
        <Card
            className={styles.inputContainer}
        >
            <div className={styles.inputHeader}>
                <span>{props.label}</span>
                <IconFont name={"move-1"} onClick={props.onDelete}/>
            </div>
            {
                props.children
            }
        </Card>
    )
}
