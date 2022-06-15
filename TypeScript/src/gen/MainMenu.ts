import { UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/Manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject } from "Utils/Components"
import { $TsButton } from "utils/UIComponent"
import { GetComponent, QuitGame, T } from "utils/Utils"
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
		UnityEngine.Screen.SetResolution(1280,720,UnityEngine.FullScreenMode.Windowed)
        let mainMenuCanvas = GetComponent<UnityEngine.Canvas>(this.gameObject,T(UnityEngine.Canvas))
        let mainCamera = GameObject.Find("Main Camera")
		if(mainMenuCanvas!=null){
			let cam = GetComponent<UnityEngine.Camera>(mainCamera,T(UnityEngine.Camera))
			if(cam!=null){
				mainMenuCanvas.worldCamera = cam
			}	
		}

		let btnStart = $TsButton(this.btnStart)
		btnStart?.Click(() => {
			UIManager.Close(this)
			ObjectManager.InstantiateAsync(Cube)
		})

		let btnSetting = $TsButton(this.btnSetting)
		btnSetting?.Click(() => {
		})

		let btnExit = $TsButton(this.btnExit)
		btnExit?.Click(() => {
			QuitGame()
		})
	}
	OnDestroy(): void {
		
	}
}

export {MainMenu}