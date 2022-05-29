using System;
using UnityEngine;
using System.Collections;
using Puerts;
using xasset;

public class TSBehaviour : MonoBehaviour
{
    static IEnumerator _WaitForSeconds(float count, Action callback)
    {
        yield return new WaitForSeconds(count);
        callback();
    }

    delegate void LoaderInit(TSBehaviour monoBehaviour);

    public string EntranceMod = "Entrance";

    static JsEnv jsEnv;

    //public Action JsAwake;
    public Action JsStart;
    public Action JsUpdate;
    public Action JsFixedUpdate;
    public Action JsOnDestroy;

    void OnEnable()
    {
        if (jsEnv == null)
        {
            jsEnv = new JsEnv(new Loader(""));
        }
        var init = jsEnv.Eval<LoaderInit>($"const Entrance = require('{EntranceMod}'); Entrance.Init");
        if (init != null)
        {
            init(this);
        }
    }

    IEnumerator Start()
    {
        var customLoader = GetComponent<CustomLoader>();
        customLoader.Initialize();

        var operation = Versions.InitializeAsync();
        yield return operation;

        if (JsStart != null) JsStart();
    }

    // Update is called once per frame
    void Update()
    {
        jsEnv.Tick();
        if (JsUpdate != null) JsUpdate();
    }

    void FixedUpdate()
    {
        if (JsFixedUpdate != null) JsFixedUpdate();
    }

    void OnDestroy()
    {
        JsStart = null;
        JsFixedUpdate = null;
        JsUpdate = null;
        JsOnDestroy = null;
    }

    void OnDisable()
    {
        if (JsOnDestroy != null) JsOnDestroy();
    }
}
