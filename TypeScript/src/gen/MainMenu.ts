import { UIBase } from "core/interface"
import { ObjectManager, UIManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { FadeTo, FlyTo, MoveTo } from "utils/SimpleAnimation"
import { $TsButton } from "utils/UIComponent"
import { QuitGame } from "utils/Utils"
import { HUD } from "./HUD"

export enum MainMenuLayout {
	Start, Pause
}

export class MainMenu implements UIBase {

	
	public gameObject: GameObject
	private btnStart: GameObject
	private btnExit: GameObject
	private btnContinue: GameObject
	private txtContinue: GameObject
	private txtTitle: GameObject
	private txtStart: GameObject
	private txtExit: GameObject
	private btnHelp: GameObject
	private helpPanel: GameObject
	private isHelpOpen:boolean = false

	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.btnStart = propsComponent.Pairs.get_Item(0).value
		this.btnExit = propsComponent.Pairs.get_Item(1).value
		this.txtTitle = propsComponent.Pairs.get_Item(2).value
		this.txtStart = propsComponent.Pairs.get_Item(3).value
		this.txtExit = propsComponent.Pairs.get_Item(4).value
		this.btnContinue = propsComponent.Pairs.get_Item(5).value
		this.txtContinue = propsComponent.Pairs.get_Item(6).value
		this.btnHelp = propsComponent.Pairs.get_Item(5).value
		this.helpPanel = propsComponent.Pairs.get_Item(6).value
	}

	private _layout!: MainMenuLayout
	public set layout(value: MainMenuLayout) {
		this._layout = value
		this.btnStart.SetActive(value == MainMenuLayout.Start)
		this.btnContinue.SetActive(value == MainMenuLayout.Pause)
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

		let btnStart = this.btnStart.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnStart?.onClick.AddListener(() => {
			this.gameObject.SetActive(false)
			UIManager.Open(HUD, "HUD")
		})

		let btnContinue = this.btnContinue.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnContinue?.onClick.AddListener(() => {
			this.gameObject.SetActive(false)
			UIManager.GetUIObject("HUD")?.gameObject.SetActive(true)
		})
		
		let btnExit = this.btnExit.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnExit?.onClick.AddListener(() => {
			QuitGame()
		})

		let txtTitle = this.txtTitle.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtTitle.text = "Tricky Box Battle!!!"	

		let txtStart = this.txtStart.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtStart.text = "开始"

		let txtContinue = this.txtContinue.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtContinue.text = "继续"

		let txtExit = this.txtExit.GetComponent($typeof(UnityEngine.UI.Text)) as UnityEngine.UI.Text
		txtExit.text = "退出"


		this.layout = MainMenuLayout.Start


		let showPos  = this.helpPanel.transform.position
		let hidePos = new Vector3(showPos.x,showPos.y,showPos.z)
		hidePos.x = hidePos.x + 1000

		MoveTo(this.helpPanel,hidePos,0,()=>{})

		let btnHelp = this.btnHelp.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
		btnHelp?.onClick.AddListener(() => {
			this.isHelpOpen = !this.isHelpOpen
			if(this.isHelpOpen){
				MoveTo(this.helpPanel,showPos,0.5,()=>{})
			}else{
				MoveTo(this.helpPanel,hidePos,0.5,()=>{})
			}
		}) 

	}

	OnDestroy(): void {
		
	}
}