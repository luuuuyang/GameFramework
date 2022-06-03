import { UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject } from "Utils/Components"
import { Cube } from "./cube"

class MainMenu implements UIBase {
	public gameObject: GameObject
	private btnInstantiate: GameObject
	private btnRotate: GameObject
	private btnPause: GameObject
	private btnDestroy: GameObject
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btnInstantiate = propsComponent.Pairs.get_Item(0).value
		this.btnRotate = propsComponent.Pairs.get_Item(1).value
		this.btnPause = propsComponent.Pairs.get_Item(2).value
		this.btnDestroy = propsComponent.Pairs.get_Item(3).value
	}
	OnStart(): void {
        let mainMenuCanvas = this.gameObject.GetComponent($typeof(UnityEngine.Canvas)) as UnityEngine.Canvas
        let mainCamera = GameObject.Find("Main Camera")
        mainMenuCanvas.worldCamera = mainCamera.GetComponent($typeof(UnityEngine.Camera)) as UnityEngine.Camera

		let cube: Cube

		let btnInstantiate = this.btnInstantiate.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnInstantiate.onClick.AddListener(() => {
			console.log("click btnInstantiate")
			let instantiateObject = ObjectManager.InstantiateAsync(Cube)
			instantiateObject.then(object => {
				console.log("InstantiateAsync completed 3")
				cube = object
			})
		})

		let btnRotate = this.btnRotate.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnRotate.onClick.AddListener(() => {
			console.log("click btnRotate")
		})

		let btnPause = this.btnPause.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnPause.onClick.AddListener(() => {
			console.log("click btnPause")
		})

		let btnDestroy = this.btnDestroy.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnDestroy.onClick.AddListener(() => {
			console.log("click btnDestroy")
			ObjectManager.Destroy(cube)
		})
	}
	OnDestroy(): void {
		
	}
}

export {MainMenu}