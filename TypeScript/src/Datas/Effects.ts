import { System } from "csharp"
import { HUD, Side } from "gen/HUD"
import { GameObject } from "Utils/Components"
import { FlyTo } from "utils/SimpleAnimation"

interface IEffect{
    env:ENV|null
    Init(env:ENV):void
    Excute(callBack:System.Action):void
    Use(callBack:System.Action):void
}

type ENV ={
    hud:HUD
    side:Side,
    effectObj:GameObject
}

export const EffectNames = {
    //回复药
    Medicine : "Effect_Medicine"
}

class Effect_Medicine implements IEffect{
    Use(callBack: System.Action): void {
        this.Excute(callBack)
    }
    Excute(callBack:System.Action): void {
        // manager 加血
        console.warn("Use a medicine")
        if(this.env!=null){
            FlyTo(this.env.effectObj,this.env.hud.GetHealth(this.env.side),0.5,()=>{
                callBack()
            })
        }else{
            console.error("No env")
        }
        
    }
    env:ENV|null = null
    Init(env:ENV){
        this.env = env
    }
}

export const EffectDefines:{[index:string]:()=>IEffect} = {
    [EffectNames.Medicine]:()=>{
        return new Effect_Medicine()
    }

}