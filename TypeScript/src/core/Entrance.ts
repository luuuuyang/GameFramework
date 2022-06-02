require("tools/source-map-support")

import { DG, TSBehaviour, TSProperties, UnityEngine, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { UIManager } from "./Manager"
import { InstantiateAsync, LoadAsync } from "./resource"

let m_UIManager = new UIManager()

class Entrance {
    bindTo: TSBehaviour
    constructor(bindTo: TSBehaviour){
        this.bindTo = bindTo
        this.bindTo.JsStart = () => this.OnStart()
        this.bindTo.JsFixedUpdate = () => this.OnFixedUpdate()
        this.bindTo.JsUpdate = () => this.OnUpdate()
        this.bindTo.JsOnDestroy = () => this.OnDestroy()
    }
    OnStart(): void {
        m_UIManager.OnStart()
    }
    OnUpdate(): void {
        m_UIManager.OnUpdate()
    }
    OnFixedUpdate(): void {
        
    }
    OnDestroy(): void {
        m_UIManager.OnDestroy()   
    }

    private cube!: xasset.InstantiateObject
    async Initialize() {
        let op_mainMenu = InstantiateAsync("Assets/Resources/MainMenu.prefab")
        let op_cube = LoadAsync("Assets/Resources/Cube.prefab", $typeof(GameObject))
        await $promise(op_mainMenu.Task)
        
        let mainMenu = op_mainMenu.result
        let mainMenuCanvas = mainMenu.GetComponent($typeof(UnityEngine.Canvas)) as UnityEngine.Canvas
        let mainCamera = GameObject.Find("Main Camera")
        mainMenuCanvas.worldCamera = mainCamera.GetComponent($typeof(UnityEngine.Camera)) as UnityEngine.Camera

        let propsComponent = mainMenu.GetComponent($typeof(TSProperties)) as TSProperties
        for (let i = 0; i < propsComponent.Pairs.Length; i++) {
            let p = propsComponent.Pairs.get_Item(i);
            let go = p.value as GameObject 
            if (p.key == "btnInstantiate") {
                let btn = go.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
                btn.onClick.AddListener(async () => {
                    if (op_cube.status == xasset.LoadableStatus.SuccessToLoad) {
                        if (!this.cube || !this.cube.result) {
                            this.cube = InstantiateAsync("Assets/Resources/Cube.prefab")
                            await $promise(this.cube.Task)
                            this.cube.result.transform.position = new Vector3(0, 1, 0)
                            this.cube.result.transform.rotation = UnityEngine.Quaternion.Euler(0, 0, 0)
                        }
                        else {
                            console.log("already instantiate")
                        }
                    }
                    else {
                        console.log("load error")
                    }
                })
            }
            else if(p.key == "btnRotate") {
                let btn = go.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
                btn.onClick.AddListener(() => {
                    if (this.cube && this.cube.result) {
                        DG.Tweening.DOTween.PauseAll()
                        this.cube.result.transform.position = new Vector3(0, 1, 0)
                        this.cube.result.transform.rotation = UnityEngine.Quaternion.Euler(0, 0, 0)
                        this.cube.result.transform.DORotate(new Vector3(0, 180, 0), 3).SetLoops(-1).SetEase(DG.Tweening.Ease.Linear)
                    }
                    else {
                        console.log("need instantiate first")
                    }
                })
            }
            else if(p.key == "btnPause") {
                let btn = go.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
                btn.onClick.AddListener(() => {
                    if (this.cube && this.cube.result) {
                        DG.Tweening.DOTween.PauseAll()
                    }
                    else {
                        console.log("need instantiate first")
                    }
                })
            }
            else if (p.key == "btnDestroy") {
                let btn = go.GetComponent($typeof(UnityEngine.UI.Button)) as UnityEngine.UI.Button
                btn.onClick.AddListener(() => {
                    if (this.cube && this.cube.result) {
                        DG.Tweening.DOTween.PauseAll()
                        this.cube.Destroy()
                    }
                    else {
                        console.log("need instantiate first")
                    }
                })
            }
        }        
    }
}

function Init(bindTo: TSBehaviour) {
    new Entrance(bindTo)
}

export {
    Init
}