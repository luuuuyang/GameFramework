import { System } from "csharp";
import { GameObject, Vector3 } from "./Components";

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

export {
    JumpOut,
    FlyTo
}