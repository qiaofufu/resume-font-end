import  data from "../data.json"
import {Render} from "./Render";
import {Elem} from "./model";

export function Resume() {
    let res = Render(data as Elem[])
    return (
        <div>
            {res}
        </div>
    )
}