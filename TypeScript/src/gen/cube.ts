import { ObjectBase } from "core/interface";
import { UnityEngine } from "csharp";

export class Cube implements ObjectBase {
    constructor(gameObejct: UnityEngine.GameObject) {
        this.gameObject = gameObejct
    }
    gameObject: UnityEngine.GameObject;
    OnStart(): void {
        
    }
    OnDestroy(): void {
        
    }
}