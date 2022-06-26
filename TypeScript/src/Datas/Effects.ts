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

async function InitVFX(vfx:string){
    let instantiateObject = InstantiateAsync(vfx)
    await $promise(instantiateObject.Task)
    let result = instantiateObject.result
    return result
}

function ResetVFXTransform(parant:GameObject,vfx:GameObject){
    vfx.SetActive(false)
    vfx.transform.SetParent(parant.transform)
    vfx.transform.localPosition = Vector3.zero
    vfx.transform.localScale = Vector3.one
}

function RotateVFX(target:GameObject,Vfx:GameObject){
    let newUpX = target.transform.position.x - Vfx.transform.position.x
    let newUpY = target.transform.position.y - Vfx.transform.position.y
    Vfx.transform.up = new Vector3(newUpX,newUpY,0)
}

export const EffectNames = {
    /**
     * 治疗药
     */
    Medicine : "Effect_Medicine",
    
    /**
     * 基础攻击（立即发动）
     */
    BasicAttack : "Effect_Attack"
}

class Effect_Medicine implements IEffect{
    healthVFX:GameObject|null = null
    Use(callBack: System.Action): void {
        //this.Excute(callBack)
    }
    Excute(callBack:System.Action): void {
        // manager 加血
        console.warn("Use a medicine")
        if(this.env!=null && this.healthVFX!=null){
            this.env.effectObj.SetActive(false)
            this.healthVFX.SetActive(true)

            let target = this.env.hud.GetHealth(this.env.side)

            RotateVFX(target,this.healthVFX)
            FlyTo(this.healthVFX,target,0.8,()=>{
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

        this.healthVFX = await InitVFX("green_vfx")
        ResetVFXTransform(this.env.itemObj,this.healthVFX)
        callBack()
    }
}

class Effect_Attack implements IEffect{
    env: ENV | null = null
    attackVFX:GameObject|null = null
    async Init(env: ENV, callBack: System.Action){
        this.env = env
        this.attackVFX = await InitVFX("red_vfx")
        ResetVFXTransform(this.env.itemObj,this.attackVFX)

        callBack()
    }
    Excute(callBack: System.Action): void {
        console.warn("Use a medicine")
        if(this.env!=null && this.attackVFX!=null){
            this.env.effectObj.SetActive(false)
            this.attackVFX.SetActive(true)
            let targetSide:Side|null = null
        
            if(this.env.side == Side.Left){
                targetSide = Side.Right
            }else{
                targetSide = Side.Left
            }

            let target = this.env.hud.GetHealth(targetSide)
            FlyTo(this.attackVFX,target,1,()=>{
                this.attackVFX?.SetActive(false)
                this.env?.hud.ModifyHeart(targetSide!,-1)

                callBack()
            })
        }else{
            console.error("No env")
        }
    }
    Use(callBack: System.Action): void {
        
    }
    
}

export const EffectDefines:{[index:string]:()=>IEffect} = {
    [EffectNames.Medicine]:()=>{
        return new Effect_Medicine()
    },
    [EffectNames.BasicAttack]:()=>{
        return new Effect_Attack()
    }

}