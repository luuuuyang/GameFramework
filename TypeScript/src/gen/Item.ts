import { ObjectBase, UIBase } from "core/interface"
import { TSProperties, UnityEngine } from "csharp"
import { $typeof } from "puerts"
import { GameObject } from "Utils/Components"

export class Item implements ObjectBase {
	public gameObject: GameObject
	private btn: GameObject
	private txt: GameObject
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btn = propsComponent.Pairs.get_Item(0).value
		this.txt = propsComponent.Pairs.get_Item(1).value
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
	
	SetText(text: string) {
		let textComponent = this.txt.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		textComponent.text = text
	}
}