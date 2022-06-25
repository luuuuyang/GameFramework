import { ObjectBase, UIBase } from "core/interface"
import { ObjectManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { System, TextureReplacer, TSProperties, UnityEngine } from "csharp"
import { EffectDefines } from "Datas/Effects"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { FlyTo, JumpOut } from "utils/SimpleAnimation"
import { T } from "utils/Utils"
import { HUD, Side } from "./HUD"

export enum ItemType{
	Empty,
	Immediate,
	Collect,
	UnSet
}


export class Item implements ObjectBase {
	public gameObject: GameObject
	private btn: GameObject
	public type:ItemType
	public effect:GameObject|null
	private effectName:string = ""
	public side:Side|null
	private hud:HUD|null
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btn = propsComponent.Pairs.get_Item(0).value
		this.type = ItemType.UnSet
		this.effect = null
		this.side = null
		this.hud = null
	}
	
	OnStart(): void {
		
	}
	OnDestroy(): void {
		
	}

	SetHUD(hud:HUD){
		this.hud = hud
	}

	async SetTypeAndEffect(side:Side,type:ItemType,effectName:string|null){
		this.side = side
		this.type = type
		if (effectName!=null){
			
			let instantiateObject = InstantiateAsync(effectName)
        	await $promise(instantiateObject.Task)
        	let result = instantiateObject.result

			result.transform.SetParent(this.gameObject.transform)
			result.transform.localPosition = Vector3.zero
			result.transform.localScale = Vector3.one
			this.effect = result
			this.effectName = effectName
			result.SetActive(false)
		}
		
	}

	OpenMe(callBack:System.Action){
		if(this.type == ItemType.UnSet){
			return
		}

		this.SetTexture(1)
		if(this.type == ItemType.Empty){
			
			return
		}

		if(this.effect==null){
			return
		}
		this.effect.SetActive(true)
		JumpOut(this.effect,0.1,1.2,1,0.3,0.1,()=>{
			if(this.type == ItemType.Immediate){
				if(this.effectName!=""){
					if(EffectDefines[this.effectName]!=undefined){
						let effect = EffectDefines[this.effectName]()
						if(this.side!=null && this.hud!=null){
							effect.Init({
								hud:this.hud,
								side:this.side,
								effectObj:this.effect!,
								itemObj:this.gameObject
							},()=>{
								effect.Excute(callBack)
							})
							
						}
						
					}else{
						console.error("No this effect "+this.effectName)
					}
				}
				return
			}
	
			if(this.type == ItemType.Collect){
				
				if(this.effect!=null){
	
					if(this.hud!=null){
						FlyTo(this.effect!,this.hud.GetBag(this.side!),0.3,()=>{
							callBack()
						})
						
					}
				}
			}	
					
		})


	}

	SetTexture(index:number){
		if(this.gameObject.GetComponent(T(TextureReplacer))){
			let replacer = this.gameObject.GetComponent(T(TextureReplacer)) as TextureReplacer
			if(replacer.Textures!=null && replacer.Textures.Count >= (index+1)){
				(this.gameObject.GetComponent(T(UnityEngine.UI.Image)) as UnityEngine.UI.Image).sprite = replacer.Textures.get_Item(index)
			}else{
				console.error("超出列表长度")
			}
		}else{
			console.error("需要在item挂载TextureReplacer")
		}
	}

	SetListener(call: UnityEngine.Events.UnityAction) {
		let btn = this.btn.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btn.onClick.RemoveListener(call)
		btn.onClick.AddListener(call)
	}
}