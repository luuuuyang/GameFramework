import * as csharp from "csharp"

let namespace = new Map<string, any>()
namespace.set("csharp.UnityEngine", csharp.UnityEngine);
namespace.set("csharp.UnityEngine.UI", csharp.UnityEngine.UI);
namespace.set("csharp.DG.Tweening", csharp.DG.Tweening);
namespace.set("csharp.xasset", csharp.xasset);


(function(){
    //@ts-ignore
    let puerts = (this ?? globalThis)["puerts"]
    namespace.forEach((module, name) => {
        module.default = module;
        puerts.registerBuildinModule(name, module)
    })
})()