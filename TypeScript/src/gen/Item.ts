import { ObjectBase, UIBase } from "core/interface"
import { TSProperties, UnityEngine } from "csharp"
import { $typeof } from "puerts"
import { GameObject } from "Utils/Components"

export class Item implements ObjectBase {
	public gameObject: GameObject
	private btn: GameObject
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btn = propsComponent.Pairs.get_Item(0).value
	}
	
	OnStart(): void {
		
	}
	OnDestroy(): void {
		
	}

	SetListener(call: UnityEngine.Events.UnityAction) {
		let btn = this.btn.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btn.onClick.RemoveListener(call)
		btn.onClick.AddListener(call)
	}
}