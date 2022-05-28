import { TSBehaviour } from "csharp"

/**
 * Basic Level Definition
 */
 interface ITSBehaviour {
    /**
     * the LevelRunner bind to
     */
    bindTo: TSBehaviour
    /**
     * Call On Level Start
     */
    OnStart(): void,
    /**
     * Call On Per Monobehaviour Update
     */
    OnUpdate(): void,
    OnFixedUpdate(): void,
    /**
     * Call On Level Destroy
     */
    OnDestroy(): void
}

export {
    ITSBehaviour
}