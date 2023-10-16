import {
    closestCenter,
    DndContext, MouseSensor, PointerSensor, useSensor, useSensors,
} from "@dnd-kit/core";
import {useState} from "react";
import {Button, Card, Form as FormItem, Input} from "antd";
import { Elem, Block} from "../model"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import styles from "./Form.module.css"
import {IconFont} from "tdesign-icons-react";
import {ContactForm} from "./component/ContactForm";
import {InfoForm} from "./component/InfoForm";

interface Item {
    id: number,
    data: Elem
}

function renderElem(elem: Elem) {
    switch (elem.type) {
        case "info": {
            return (
                <InputContainer label={"基本信息"} >
                   <InfoForm/>
                </InputContainer>
            )
        }
        case "contact": {
            return (
                <InputContainer label={"联系方式"}>
                    <ContactForm/>
                </InputContainer>
            )
        }
    }
}

function InputContainer(props:any) {
    return (
        <Card
            className={styles.inputContainer}
        >
            <div className={styles.inputHeader}>
                <span>{props.label}</span>
                <IconFont name={"move-1"}/>
            </div>
            {
                props.children
            }
        </Card>
    )
}

export function Form() {
    const [items, setItems] = useState([] as Item[]);
    function add(data:Elem) {
        setItems((prevState) => {
            const newItem = {id: prevState.length + 1, data: data}
            const res = [...prevState, newItem] as Item[]
            return res
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

    // 拖拽开始处理函数
    function handleDragStart() {

    }

    // 拖拽结束处理函数
    function handleDragEnd(event:any) {
        const {active, over} = event;
        console.log(active.id, over.id);
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

    return (
        <div>
            <div>
                <Button onClick={addBlock("info")}>Info</Button>
                <Button onClick={addBlock("contact")}>Contact</Button>
                <Button onClick={addBlock("education")}>Education</Button>
                <Button onClick={addBlock("skill")}>Skill</Button>
                <Button onClick={addBlock("project")}>Project</Button>
                <Button onClick={addBlock("experience")}>Experience</Button>
                <Button onClick={addBlock("award")}>Award</Button>
            </div>
            <DndContext
                         collisionDetection={closestCenter}
                         onDragEnd={handleDragEnd}
                         onDragStart={handleDragStart}
                         sensors={sensors}
            >
                <SortableContext items={items}  strategy={verticalListSortingStrategy}>
                    {items.map((elem) => (
                        // We updated the Droppable component so it would accept an `id`
                        // prop and pass it to `useDroppable`
                        <SortItem key={elem.id} id={elem.id}>
                            {renderElem(elem.data)}
                        </SortItem>
                    ))}
                </SortableContext>


            </DndContext>
        </div>

    );
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