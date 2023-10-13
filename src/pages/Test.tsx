import React, {useState} from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {Button} from "antd";




export function Test() {
    const [items, setItems] = useState([] as any[]);
    function add(type:string) {
        setItems((prevState)=> {
            const newItem = {id: prevState.length, type: type}
            return [...prevState, newItem]
        })
        console.log(items)
    }
    return (

        <div>
            <div>
                <Button onClick={() => add("info")}>INFO</Button>

                <Button onClick={()=>add("contact")}>Contact</Button>
            </div>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(elem => <SortableItem key={elem.id} id={elem.id}/>)}
                </SortableContext>
            </DndContext>
        </div>
    );

    function handleDragEnd(event:any) {
        const {active, over} = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((elem)=>elem.id === active.id);
                const newIndex = items.findIndex((elem)=>elem.id === over.id);
                console.log(active.id, over.id, newIndex, oldIndex)

                const newItems =  [...items]
                const t = newItems[oldIndex]
                newItems[oldIndex] = newItems[newIndex]
                newItems[newIndex] = t
                console.log(newItems)
                return newItems
            });
        }
    }
}

function SortableItem(props:any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        width: "200px",
        border: "solid",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.id}
        </div>
    );
}