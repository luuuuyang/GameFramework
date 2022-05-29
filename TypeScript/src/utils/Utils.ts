import { Common, System, UnityEngine } from "csharp"
import { $typeof } from "puerts";
import { GameObject } from "./Components"

const QuitGame = Common.QuitGame

const T = $typeof

const Log = Common.Log
const Warn = Common.Warn
const Error = Common.Error

function GetComponent<T extends UnityEngine.Component>(gameObject: GameObject, type: System.Type): T | null {
    if (gameObject != null){
        let component = gameObject.GetComponent(type) as T;
        if (component != null) {
            return component
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