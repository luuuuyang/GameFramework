import { UnityEngine } from "csharp"

interface TsBehaviour {
    gameObject: UnityEngine.GameObject
    OnStart(): void
    OnUpdate(): void
    OnDestroy(): void
}

export { TsBehaviour }