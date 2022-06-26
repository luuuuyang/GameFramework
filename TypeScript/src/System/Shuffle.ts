import { ItemType } from "gen/Item"

type ShuffleData = {
    type:ItemType,
    effectName:string
}

function ShuffleItemData(col:number,row:number):Array<ShuffleData>{
    let rt = Array<ShuffleData>()

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