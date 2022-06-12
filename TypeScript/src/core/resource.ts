import { System, xasset } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject } from "Utils/Components"

//#region 
let m_LoadedAssets = new Map<string, xasset.Asset>()
let m_InstantiatedObjects = new Map<GameObject, xasset.InstantiateObject>()
//#endregion

//#region Instantiate
export function InstantiateAsync(assetPath: string) {
    assetPath = "Assets/Resources/" + assetPath + ".prefab"
    let instantiateObject = xasset.InstantiateObject.InstantiateAsync(assetPath)
    let customCompleted = new xasset.OperationAction(operation => {
        m_InstantiatedObjects.set(instantiateObject.result, instantiateObject)
    })
    instantiateObject.completed = System.Delegate.Combine(instantiateObject.completed, customCompleted) as xasset.OperationAction
    return instantiateObject
}

export function Destroy(gameObject: GameObject) {
    let instantiateObject = m_InstantiatedObjects.get(gameObject)
    if (instantiateObject !== undefined) {
        m_InstantiatedObjects.delete(gameObject)
        instantiateObject.Destroy()
    }
}
//#endregion

//#region Load
export function Load(path: string, type: System.Type) {
    if (m_LoadedAssets.get(path) === undefined) {
        let asset = xasset.Asset.Load(path, type)
        m_LoadedAssets.set(path, asset)
        return asset
    }
}

export function LoadAsync(path: string, type: System.Type, completed?: xasset.AssetAction) {
    if (m_LoadedAssets.get(path) === undefined) {
        let customCompleted = new xasset.AssetAction(asset => {
            m_LoadedAssets.set(path, asset)
        })
        if (completed !== undefined) {
            completed = System.Delegate.Combine(completed, customCompleted) as xasset.AssetAction
        }
        else {
            completed = customCompleted
        }
        let asset = xasset.Asset.LoadAsync(path, type, completed)
        return asset
    }
}

export function Release(path: string) {
    let asset = m_LoadedAssets.get(path)
    if (asset !== undefined) {
        m_LoadedAssets.delete(path)
        asset.Release()
    }
}

export function LoadWithSubAssets(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssets(path, type)
}

export function LoadWithSubAssetsAsync(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssetsAsync(path, type)
}
//#endregion