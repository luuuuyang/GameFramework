import { EffectNames } from "Datas/Effects"
import { ItemType } from "gen/Item"

type ShuffleData = {
    type:ItemType,
    effectName:string
}

function ShuffleItemData(col:number,row:number):Array<ShuffleData>{
    let rt = Array<ShuffleData>()

    let length = col*row
    for(let i = 0;i<Math.floor(length*(12/48));i++){
        rt.push({
            type:ItemType.Immediate,
            effectName:EffectNames.BasicAttack
        })
    }
    for(let i = 0;i<Math.floor(length*(6/48));i++){
        rt.push({
            type:ItemType.Immediate,
            effectName:EffectNames.BasicCure
        })
    }
    for(let i = 0;i<Math.floor(length*(4/48));i++){
        rt.push({
            type:ItemType.Immediate,
            effectName:EffectNames.Curse
        })
    }
    for(let i = 0;i<Math.floor(length*(6/48));i++){
        rt.push({
            type:ItemType.Collect,
            effectName:EffectNames.Medicine
        })
    }

    for(let i = 0;i<Math.floor(length*(4/48));i++){
        rt.push({
            type:ItemType.Collect,
            effectName:EffectNames.ShowContent
        })
    }
    for(let i = 0;i<Math.floor(length*(4/48));i++){
        rt.push({
            type:ItemType.Collect,
            effectName:EffectNames.ArrowAttack
        })
    }

    let emptyLength = (length-rt.length)
    for(let i = 0;i<emptyLength;i++){
        rt.push({
            type:ItemType.Empty,
            effectName:"NONE"
        })
    }
    console.log(rt.length)

    FYShuffle(rt)
    FYShuffle(rt)
    return rt
}

function FYShuffle (arr:Array<any>) {
    let len = arr.length;
    
    while (len > 1) {
        let rand = Math.floor(Math.random() * len);
        len--;
        let temp = arr[len];
        arr[len] = arr[rand];
        arr[rand] = temp;
    }

    return arr;
}

export{
    ShuffleItemData,
    FYShuffle
}