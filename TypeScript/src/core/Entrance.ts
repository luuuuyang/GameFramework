import { TSBehaviour, xasset } from "csharp"
import { ITSBehaviour } from "Interface/ITSBehaviour"
import { $promise } from "puerts"
import { Vector3 } from "Utils/Components"

class Entrance implements ITSBehaviour {
    bindTo: TSBehaviour
    constructor(bindTo: TSBehaviour){
        this.bindTo = bindTo
        this.bindTo.JsStart = () => this.OnStart()
        this.bindTo.JsFixedUpdate = () => this.OnFixedUpdate()
        this.bindTo.JsUpdate = () => this.OnUpdate()
        this.bindTo.JsOnDestroy = () => this.OnDestroy()
    }
    OnStart(): void {
        this.Initialize()
    }
    OnUpdate(): void {
        
    }
    OnFixedUpdate(): void {
        
    }
    OnDestroy(): void {
        
    }

    async Initialize() {
        let cube = xasset.InstantiateObject.InstantiateAsync("Assets/Resources/Cube.prefab")
        await $promise(cube.Task)

        let trans = cube.result.transform
        trans.position = Vector3.zero
        
        let up = new Vector3(0,1,0)
        let down = Vector3.zero

        let moveUp = () => {
            trans?.DOMove(up, 1).OnComplete(moveDown)
        }

        let moveDown = () => {
            trans?.DOMove(down, 1).OnComplete(moveUp)
        }

        moveUp()
    }
}

function Init(bindTo: TSBehaviour) {
    new Entrance(bindTo)
}

export {
    Init
}