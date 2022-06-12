import { ObjectBase } from "core/interface";
import { DG, UnityEngine } from "csharp";
import { Vector3 } from "Utils/Components";

export class Cube implements ObjectBase {
    constructor(gameObejct: UnityEngine.GameObject) {
        this.gameObject = gameObejct
    }
    gameObject: UnityEngine.GameObject;
    OnStart(): void {
        this.gameObject.transform.position = new Vector3(0, 1, 0)
        this.gameObject.transform.DORotate(new Vector3(0, 180, 0), 1).SetLoops(-1)
    }
    OnDestroy(): void {
        
    }
}