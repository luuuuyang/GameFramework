import { UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject } from "Utils/Components"
import { $TsButton } from "utils/UIComponent"
import { QuitGame } from "utils/Utils"
import { HUD } from "./HUD"

export enum MainMenuType {
	Start, Pause
}

export class MainMenu implements UIBase {
	public gameObject: GameObject
	private btnStart: GameObject
	private btnExit: GameObject
	private txtTitle: GameObject
	private txtStart: GameObject
	private txtExit: GameObject
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btnStart = propsComponent.Pairs.get_Item(0).value
		this.btnExit = propsComponent.Pairs.get_Item(1).value
		this.txtTitle = propsComponent.Pairs.get_Item(2).value
		this.txtStart = propsComponent.Pairs.get_Item(3).value
		this.txtExit = propsComponent.Pairs.get_Item(4).value
	}

	OnStart(): void {
        let mainMenuCanvas = this.gameObject.GetComponent($typeof(UnityEngine.Canvas)) as UnityEngine.Canvas
		if (mainMenuCanvas != null) {
			let mainCamera = GameObject.Find("Main Camera")
			let camera = mainCamera.GetComponent($typeof(UnityEngine.Camera)) as UnityEngine.Camera
			if (camera != null) {
				mainMenuCanvas.worldCamera = camera
			}
		}
		
		let btnExit = this.btnExit.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnExit?.onClick.AddListener(() => {
			QuitGame()
		})

		let txtTitle = this.txtTitle.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtTitle.text = "Tricky Box Battle!!!"		

		let txtExit = this.txtExit.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtExit.text = "退出"

		this.SetMenuType(MainMenuType.Start)
	}

	SetMenuType(type: MainMenuType) {
		let btnStart = this.btnStart.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		let txtStart = this.txtStart.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		switch (type) {
			case MainMenuType.Start:
				btnStart?.onClick.AddListener(() => {
					this.gameObject.SetActive(false)
					UIManager.Open(HUD, "HUD")
				})
				txtStart.text = "开始"
				break;
			case MainMenuType.Pause:
				btnStart?.onClick.AddListener(() => {
					this.gameObject.SetActive(false)
					UIManager.GetUIObject("HUD")?.gameObject.SetActive(true)
				})
				txtStart.text = "继续"
				break;
		}
	}

	OnDestroy(): void {
		
	}
}