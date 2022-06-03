import { System, xasset } from "csharp"
import { $promise } from "puerts"
import { GameObject } from "Utils/Components"

//#region 
let m_LoadedAssets = new Map<string, xasset.Asset>()
let m_InstantiatedObjects = new Map<GameObject, xasset.InstantiateObject>()
//#endregion

//#region Instantiate
export function InstantiateAsync(assetPath: string) {
    assetPath = "Assets/Resources/" + assetPath + ".prefab"
    let instantiateObject = xasset.InstantiateObject.InstantiateAsync(assetPath)
    // todo: Combine
    // System.Delegate.Combine(instantiateObject.completed)
    instantiateObject.completed = () => {
        m_InstantiatedObjects.set(instantiateObject.result, instantiateObject)
    }
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

export function LoadAsync(path: string, type: System.Type, completed?: System.Action$1<xasset.Asset>) {
    if (m_LoadedAssets.get(path) === undefined) {
        let asset = xasset.Asset.LoadAsync(path, type)
        asset.completed = () => {
            m_LoadedAssets.set(path, asset)
        }
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