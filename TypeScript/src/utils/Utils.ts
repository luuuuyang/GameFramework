import { Common, System, UnityEngine } from "csharp"
import { $typeof } from "puerts";
import { GameObject } from "./Components"

const QuitGame = Common.QuitGame

const T = $typeof

const Log = Common.Log
const Warn = Common.Warn
const Error = Common.Error

function GetComponent<Type extends UnityEngine.Component>(obj:GameObject,type:System.Type):Type|null{
    if(obj!=null){
        let comp = obj.GetComponent(type) as Type;
        if(comp!=null){
            return comp
        }
    }
    return null
}

export{
    QuitGame,
    GetComponent,
    T,
    Log,
    Warn,
    Error
}