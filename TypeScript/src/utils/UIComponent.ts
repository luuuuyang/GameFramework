import { System, UnityEngine } from "csharp";
import { GameObject } from "./Components";
import { GetComponent, T } from "./Utils";

class UnityButton extends UnityEngine.UI.Button{}

class TsButton{
    uButton:UnityEngine.UI.Button

    constructor(btn:UnityButton){
        this.uButton = btn
    }

    Click(action:System.Action){
        this.uButton.onClick.AddListener(action)
    }
}

function $TsButton(btn:GameObject):TsButton|null{
    let btnComponent = GetComponent<UnityButton>(btn,T(UnityButton))
    if(btnComponent!=null){
        return new TsButton(btnComponent)
    }
    return null
}

export{
    $TsButton
}