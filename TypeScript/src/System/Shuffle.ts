import { ItemType } from "gen/Item"

type ShuffleData = {
    type:ItemType,
    effectName:string
}

function ShuffleItemData(col:number,row:number):Array<ShuffleData>{
    let rt = Array<ShuffleData>()

    return rt
}

export{
    ShuffleItemData
}