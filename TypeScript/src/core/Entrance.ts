import { TSBehaviour } from "csharp"
import { ITSBehaviour } from "Interface/ITSBehaviour"
import { GameObject, Transform, Vector3 } from "Utils/Components"
import { GetComponent, T, Warn } from "Utils/Utils"

class Entrance implements ITSBehaviour {
    bindTo: TSBehaviour
    constructor(bindTo: TSBehaviour){
        this.bindTo = bindTo
        this.bindTo.JsStart = () => this.OnStart()
        this.bindTo.JsFixedUpdate = () => this.OnFixedUpdate()
        this.bindTo.JsUpdate = () => this.OnUpdate()
        this.bindTo.JsOnDestroy = ()=> this.OnDestroy()
    }
    OnStart(): void {
        let cube = GameObject.Find("Cube")
        let trans = GetComponent<Transform>(cube,T(Transform))
        if(trans!=null){
            trans.position = Vector3.zero
        }

        let up = new Vector3(0,1,0)
        let down = Vector3.zero

        let moveUp = ()=>{
            trans?.DOMove(up,1).OnComplete(moveDown)
        }

        let moveDown = ()=>{
            trans?.DOMove(down,1).OnComplete(moveUp)
        }

        moveUp()
    }
    OnUpdate(): void {
        
    }
    OnFixedUpdate(): void {
        
    }
    OnDestroy(): void {
        
    }
}

function Init(bindTo: TSBehaviour) {
    new Entrance(bindTo)
}

export {
    Init
}