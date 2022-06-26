import { CSInputManager, System, UnityEngine } from "csharp"
import { $promise } from "puerts"
import { Constructor } from "core/type"
import { ObjectBase, TsBehaviour, UIBase } from "./interface"
import { Destroy, InstantiateAsync } from "./resource"
import { MainMenu, MainMenuType } from "gen/MainMenu"
import { HUD } from "gen/HUD"

abstract class Factory {
    abstract New(ctor: Constructor<TsBehaviour>): void;
}

class InputManager_Internal implements TsBehaviour {
    private m_CSInputManager = CSInputManager.Instance as CSInputManager
    OnStart(): void {
        this.m_CSInputManager.OnEscCallback = new CSInputManager.InputCallBack(context => {
            UIManager.GetUIObject("HUD")?.gameObject.SetActive(false)
            const mainMenu = UIManager.GetUIObject("MainMenu") as MainMenu
            mainMenu.gameObject.SetActive(true)
            mainMenu.SetMenuType(MainMenuType.Pause)
        })
    }
    OnDestroy(): void {
        
    }
}

class UIManager_Internal implements TsBehaviour {
    private m_UIObjectList = new Map<string, UIBase>()

    async Open(ctor: Constructor<UIBase>, prefabName?: string) {
        let name = ctor.name
        if (prefabName !== undefined) {
            name = prefabName
        }
        // UIObject is unique
        if (!this.m_UIObjectList.has(name)) {
            let instantiateObject = InstantiateAsync(name)
            await $promise(instantiateObject.Task)
            let uiObject = new ctor(instantiateObject.result)
            uiObject.OnStart()
            this.m_UIObjectList.set(name, uiObject)
        }
    }

    Close(uiObject: UIBase) {
        let name = uiObject.gameObject.name
        name = name.substring(0, name.indexOf("(Clone)"))
        this.m_UIObjectList.delete(name)
        uiObject.OnDestroy()
        Destroy(uiObject.gameObject)
    }

    GetUIObject(name: string) {
        if (this.m_UIObjectList.has(name)) {
            return this.m_UIObjectList.get(name)
        }
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
        this.m_UIObjectList.clear()
    }
}

class ObjectManager_Internal implements TsBehaviour {
    private m_ObjectList = new Map<number, ObjectBase>()

    async InstantiateAsync(ctor: Constructor<ObjectBase>) {
        let instantiateObject = InstantiateAsync(ctor.name)
        await $promise(instantiateObject.Task)
        let result = instantiateObject.result
        let instanceID = result.GetInstanceID()
        result.name += `(${instanceID})`
        let object = new ctor(result)
        object.OnStart()
        this.m_ObjectList.set(instanceID, object)
        return object
    }

    Destroy(object: ObjectBase) {
        let instanceID = object.gameObject.GetInstanceID()
        this.m_ObjectList.delete(instanceID)
        object.OnDestroy()
        Destroy(object.gameObject)
    }
    
    OnStart(): void {

    }

    OnUpdate(): void {
        this.m_ObjectList.forEach(object => {
            object.OnUpdate?.call(object)
        })
    }

    OnDestroy(): void {
        this.m_ObjectList.forEach(object => {
            object.OnDestroy()
        })
        this.m_ObjectList.clear()
    }
}

export const InputManager = new InputManager_Internal()
export const ObjectManager = new ObjectManager_Internal()
export const UIManager = new UIManager_Internal()
