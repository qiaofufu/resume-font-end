import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {useState} from "react";
import {Button} from "antd";
import {Info, Elem, ContactItem, Block} from "../model"
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";


interface Item {
    id: number,
    data: Elem
}

export function Forms() {
    const [items, setItems] = useState([] as Item[]);
    function add(data:string) {
        setItems((prevState) => {
            const newItem = {id: prevState.length, data: data}
            return [...prevState, newItem] as Item[]
        })
        console.log(items)
    }

    function addInfo() {
        return
    }
    return (
        <div>
            <div>
                <Button onClick={}>Info</Button>
                <Button onClick={addBlock}>Contact</Button>
            </div>
            <DndContext
                         collisionDetection={closestCenter}
                         onDragEnd={handleDragEnd}
            >
                <SortableContext items={containers}  strategy={verticalListSortingStrategy}>
                    {containers.map((elem) => (
                        // We updated the Droppable component so it would accept an `id`
                        // prop and pass it to `useDroppable`
                        draggableMarkup(elem)
                    ))}
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

function SortItem(props:any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: props.id});

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {props.children}
        </button>
    );
}