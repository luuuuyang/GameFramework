import { System, xasset } from "csharp"
import { $promise } from "puerts"

let m_AssetLoaded: Set<string> = new Set<string>()
let m_AssetInstantiated: Map<string, number> = new Map<string, number>()

function InstantiateAsync(assetPath: string) {
    // m_AssetInstantiated.set(assetPath,  (m_AssetInstantiated.get(assetPath) ?? 0) + 1)
    return xasset.InstantiateObject.InstantiateAsync(assetPath)
}

function Load(path: string, type: System.Type) {
    return xasset.Asset.Load(path, type)
}

async function LoadAsync(path: string, type: System.Type, completed?: System.Action$1<xasset.Asset>) {
    if (!m_AssetLoaded.has(path)) {
        let onCompleted = () => {
            m_AssetLoaded.add(path)
        }
        if (completed) {
            System.Delegate.Combine(completed, onCompleted)
        }
        else {
            completed = onCompleted
        }
        return xasset.Asset.LoadAsync(path, type, completed)
    }
    else {
        console.log("asset '" + path + "' has been loaded")
    }
}

function LoadWithSubAssets(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssets(path, type)
}

function LoadWithSubAssetsAsync(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssetsAsync(path, type)
}

export {InstantiateAsync, Load, LoadAsync, LoadWithSubAssets, LoadWithSubAssetsAsync}