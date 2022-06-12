import { UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject } from "Utils/Components"
import { Cube } from "./cube"

class MainMenu implements UIBase {
	public gameObject: GameObject
	private btnStart: GameObject;
	private btnSetting: GameObject;
	private btnExit: GameObject;
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btnStart = propsComponent.Pairs.get_Item(0).value
		this.btnSetting = propsComponent.Pairs.get_Item(1).value
		this.btnExit = propsComponent.Pairs.get_Item(2).value
	}
	OnStart(): void {
        let mainMenuCanvas = this.gameObject.GetComponent($typeof(UnityEngine.Canvas)) as UnityEngine.Canvas
        let mainCamera = GameObject.Find("Main Camera")
        mainMenuCanvas.worldCamera = mainCamera.GetComponent($typeof(UnityEngine.Camera)) as UnityEngine.Camera

		let btnStart = this.btnStart.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnStart.onClick.AddListener(() => {
			UIManager.Close(this)
			ObjectManager.InstantiateAsync(Cube)
		})

		let btnSetting = this.btnSetting.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnSetting.onClick.AddListener(() => {
		})

		let btnExit = this.btnExit.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnExit.onClick.AddListener(() => {
		})
	}
	OnDestroy(): void {
		
	}
}

export {MainMenu}