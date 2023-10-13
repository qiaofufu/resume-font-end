import  data from "../data.json"
import {Render} from "./Render";
import {Elem} from "./model";

export function Resume({className}:{className?:string}) {
    let res = Render(data as Elem[])
    return (
        <div className={className}>
            {res}
        </div>
    )
}