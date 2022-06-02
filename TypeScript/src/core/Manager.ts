import { UnityEngine } from "csharp"
import { $promise } from "puerts"
import { TsBehaviour, UIBase } from "./interface"
import { InstantiateAsync } from "./resource"

type Constructor<T> = new(...args: any[]) => T

abstract class Factory {
    abstract New(ctor: Constructor<TsBehaviour>): void;
}

class UIManager extends Factory implements TsBehaviour {
    private m_UIObjectList: UIBase[] = []
    async New(ctor: Constructor<UIBase>) {
        let operation = InstantiateAsync(ctor.name)
        await $promise(operation.Task)
        let uiObject = new ctor(operation.result)
        uiObject.OnStart()
        this.m_UIObjectList.push(uiObject)
    }
    OnStart(): void {

    }
    OnUpdate(): void {
        this.m_UIObjectList.forEach(uiObject => {
            uiObject.OnUpdate?.call(uiObject)
        })
    }
    OnDestroy(): void {
        this.m_UIObjectList.forEach(uiObject => {
            uiObject.OnDestroy()
        })
        this.m_UIObjectList = []
    }
}

export { UIManager }