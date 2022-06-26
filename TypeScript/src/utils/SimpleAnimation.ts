import { System, UnityEngine } from "csharp";
import { GameObject, Vector3 } from "./Components";
import { T } from "./Utils";

function JumpOut(obj:GameObject,start:number,oversize:number,end:number,jumpTime:number,endTime:number,callback:System.Action){
    obj.transform.localScale = new Vector3(start,start,start)
    obj.transform.DOScale(new Vector3(oversize,oversize,oversize),jumpTime).OnComplete(()=>{
        obj.transform.DOScale(new Vector3(end,end,end),endTime).OnComplete(()=>{
            callback()
        })
    })
}

function FlyTo(obj:GameObject,target:GameObject,time:number,callBack:System.Action){
    obj.transform.DOMove(target.transform.position,time).OnComplete(()=>{
        callBack()
    })
}

function FadeTo(obj:GameObject,target:number,time:number,callBack:System.Action){
    let img = obj.GetComponent(T(UnityEngine.UI.Image)) as UnityEngine.UI.Image
    if(img!=null){
        img.DOFade(target,time).OnComplete(()=>{
            callBack()
        })
    }
}


function ResetAlpha(obj:GameObject){
    let img = obj.GetComponent(T(UnityEngine.UI.Image)) as UnityEngine.UI.Image
    img.DOFade(1,0)
}

export {
    JumpOut,
    FlyTo,
    FadeTo,
    ResetAlpha
}