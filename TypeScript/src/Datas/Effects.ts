import { InstantiateAsync } from "core/resource"
import { System } from "csharp"
import { HUD, Side } from "gen/HUD"
import { $promise } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { FlyTo } from "utils/SimpleAnimation"

interface IEffect{
    env:ENV|null
    Init(env:ENV,callBack:System.Action):void
    Excute(callBack:System.Action):void
    Use(callBack:System.Action):void
}

type ENV ={
    hud:HUD
    side:Side,
    itemObj:GameObject,
    effectObj:GameObject
}

export const EffectNames = {
    //回复药
    Medicine : "Effect_Medicine"
}

class Effect_Medicine implements IEffect{
    healthVFX:GameObject|null = null
    Use(callBack: System.Action): void {
        this.Excute(callBack)
    }
    Excute(callBack:System.Action): void {
        // manager 加血
        console.warn("Use a medicine")
        if(this.env!=null && this.healthVFX!=null){
            this.env.effectObj.SetActive(false)
            this.healthVFX.SetActive(true)
            let newUpX = this.env.hud.GetHealth(this.env.side).transform.position.x - this.healthVFX.transform.position.x
            let newUpY = this.env.hud.GetHealth(this.env.side).transform.position.y - this.healthVFX.transform.position.y
            this.healthVFX.transform.up = new Vector3(newUpX,newUpY,0)
            FlyTo(this.healthVFX,this.env.hud.GetHealth(this.env.side),0.8,()=>{
                this.healthVFX?.SetActive(false)
                callBack()
            })
        }else{
            console.error("No env")
        }
        
    }
    env:ENV|null = null
    async Init(env:ENV,callBack:System.Action){
        this.env = env
        let instantiateObject = InstantiateAsync("green_vfx")
        await $promise(instantiateObject.Task)
        let result = instantiateObject.result

        this.healthVFX = result
        this.healthVFX.SetActive(false)
        this.healthVFX.transform.SetParent(this.env.itemObj.transform)
        this.healthVFX.transform.localPosition = Vector3.zero
        this.healthVFX.transform.localScale = Vector3.one
        callBack()
    }
}

export const EffectDefines:{[index:string]:()=>IEffect} = {
    [EffectNames.Medicine]:()=>{
        return new Effect_Medicine()
    }

}