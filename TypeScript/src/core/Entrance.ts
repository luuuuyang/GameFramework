require("tools/source-map-support")

import { DG, TSBehaviour, TSProperties, UnityEngine, xasset } from "csharp"
import { MainMenu } from "gen/MainMenu"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { UIManager, ObjectManager } from "./manager"
import { InstantiateAsync, LoadAsync } from "./resource"

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
        ObjectManager.OnStart()
        UIManager.OnStart()

        UIManager.Open(MainMenu)
    }
    OnUpdate(): void {
        ObjectManager.OnUpdate()
        UIManager.OnUpdate()
    }
    OnFixedUpdate(): void {
        
    }
    OnDestroy(): void {
        ObjectManager.OnDestroy()
        UIManager.OnDestroy()
    }
}

export function Init(bindTo: TSBehaviour) {
    new Entrance(bindTo)
}