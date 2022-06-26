import { ObjectBase, UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { System, TextureReplacer, TSProperties, UnityEngine } from "csharp"
import { EffectDefines } from "Datas/Effects"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { FlyTo, JumpOut } from "utils/SimpleAnimation"
import { T } from "utils/Utils"
import { HUD, Side } from "./HUD"
import { Item, ItemType } from "./Item"


export class BagItem extends Item {
	constructor(gameObject: GameObject) {
		super(gameObject)
	}
	
	OnStart(): void {
		
	}
	OnDestroy(): void {
		
	}

	CopyItem(item: Item, callBack: System.Action) {
		this.side = item.side
		this.type = ItemType.Immediate
		let effect = item.effect
		this.effect = effect
		this.effectName = item.effectName
		item.effect = null
		effect?.transform.SetParent(this.gameObject.transform)
		if (effect) {
			effect.transform.localScale = Vector3.one
		}
		this.SetTexture(0)
		this.SetListener(() => {
			if(EffectDefines[this.effectName]!=undefined){
				let effect = EffectDefines[this.effectName]()
				if(this.side!=null && this.hud != null){
					effect.Init({
						hud: this.hud,
						side: this.side,
						effectObj: this.effect!,
						itemObj: this.gameObject
					},()=>{
						effect.Excute(callBack)
						ObjectManager.Destroy(this)
					})
				}
			}else{
				console.error("No this effect "+this.effectName)
			}
		})
	}
}