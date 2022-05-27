import { GameEntrance} from "csharp"
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