import {Render} from "./Render";
import {Elem} from "../model";

export function Resume(props:{className?:string, data:any}) {
    let res = Render(props.data as Elem[])
    return (
        <div className={props.className}>
            {res}
        </div>
    )
}