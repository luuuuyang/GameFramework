import { LevelRunner } from "csharp"

/**
 * Basic Level Definition
 */
 interface IGameLevel {
    /**
     * the LevelRunner bind to
     */
    bindTo:LevelRunner
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
    IGameLevel
}