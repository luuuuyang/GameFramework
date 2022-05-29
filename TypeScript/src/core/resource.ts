import { System, xasset } from "csharp"

function InstantiateAsync(assetPath: string) {
    return xasset.InstantiateObject.InstantiateAsync(assetPath)
}

function Load(path: string, type: System.Type) {
    return xasset.Asset.Load(path, type)
}

function LoadAsync(path: string, type: System.Type, completed?: System.Action$1<xasset.Asset>) {
    return xasset.Asset.LoadAsync(path, type, completed)
}

function LoadWithSubAssets(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssets(path, type)
}

function LoadWithSubAssetsAsync(path: string, type: System.Type) {
    return xasset.Asset.LoadWithSubAssetsAsync(path, type)
}

export {InstantiateAsync, Load, LoadAsync, LoadWithSubAssets, LoadWithSubAssetsAsync}