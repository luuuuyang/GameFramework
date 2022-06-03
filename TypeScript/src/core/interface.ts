import { UnityEngine } from "csharp"

/**
 * TsBehaviour is the base interface from which every Typescript object implements.
 */
export interface TsBehaviour {
    /**
     * Mono GameObject
     */
    gameObject?: UnityEngine.GameObject
    OnStart(): void
    /**
     * Update is called once per frame
     */
    OnUpdate?(): void
    OnDestroy(): void
}

export interface ObjectBase extends TsBehaviour {
    gameObject: UnityEngine.GameObject
}

export interface UIBase extends TsBehaviour {
    gameObject: UnityEngine.GameObject
}