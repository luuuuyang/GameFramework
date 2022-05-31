import csharp = require("csharp");

(function () {
    // @ts-ignore
    let puerts = (this ?? globalThis)["puerts"];
    puerts.registerBuildinModule("path", {
        // @ts-ignore
        dirname(path) {
            return csharp.System.IO.Path.GetDirectoryName(path);
        },
        // @ts-ignore
        resolve(dir, url) {
            url = url.replace(/\\/g, "/");
            while (url.startsWith("../")) {
                dir = csharp.System.IO.Path.GetDirectoryName(dir);
                url = url.substr(3);
            }
            return csharp.System.IO.Path.Combine(dir, url);
        },
    });
    puerts.registerBuildinModule("fs", {
        // @ts-ignore
        existsSync(path) {
            return csharp.System.IO.File.Exists(path);
        },
        // @ts-ignore
        readFileSync(path) {
            return csharp.System.IO.File.ReadAllText(path);
        },
    });
    // @ts-ignore
    let global = this ?? globalThis;
    global["Buffer"] = global["Buffer"] ?? {};
})();

require("source-map-support").install()