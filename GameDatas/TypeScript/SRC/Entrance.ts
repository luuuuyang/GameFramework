import { GameEntrance } from "csharp"
import { GameObject, Transform, Vector3 } from "Utils/Components"
import { GetComponent, T } from "Utils/Utils"
import { IGameLevel } from "./Interface/IGameEntrance"
console.log("This is where the game start !!!")

class Entrance implements IGameLevel {
    bindTo: GameEntrance
    constructor(bindTo: GameEntrance){
        this.bindTo = bindTo
        this.bindTo.JsStart = ()=> {this.OnStart()}
        this.bindTo.JsUpdate = ()=> {this.OnUpdate()}
        this.bindTo.JsFixedUpdate = ()=> {this.OnFixedUpdate()}
        this.bindTo.JsOnDestroy = ()=> {this.OnDestroy()}
    }
    OnStart(): void {
        console.warn("Start Game....!!")
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
        console.warn("Quit Game....!!")
    }
}

function Init(bindTo:GameEntrance) {
    return new Entrance(bindTo)
}

export {
    Init
}
