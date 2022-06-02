import { UnityEngine } from "csharp"

/**
 * TsBehaviour is the base interface from which every Typescript object implements.
 */
interface TsBehaviour {
    /**
     * The GameObject bound to
     */
    gameObject?: UnityEngine.GameObject
    OnStart(): void
    /**
     * Update is called once per frame
     */
    OnUpdate?(): void
    OnDestroy(): void
}

interface UIBase extends TsBehaviour {
    
}

export { TsBehaviour, UIBase }