using System;
using UnityEngine;
using System.Collections;
using Puerts;
using xasset;
using UnityEngine.InputSystem;

public class TSBehaviour : MonoBehaviour
{
    delegate void LoaderInit(TSBehaviour monoBehaviour);

    public string EntranceMod = "Entrance";

    static JsEnv jsEnv;

    //public Action JsAwake;
    public Action JsStart;
    public Action JsUpdate;
    public Action JsFixedUpdate;
    public Action JsOnDestroy;

    //async void RunScript()
    void RunScript()
    {
        if (jsEnv == null)
        {
            jsEnv = new JsEnv(new Loader("E:/UnityProject/GameFramework/TypeScript/outPut/"), 9229);
            //jsEnv = new JsEnv(new Loader("E:/UnityProject/GameFramework/Assets/StreamingAssets/"), 9229);
        }
        // jsEnv.WaitDebugger();
        var init = jsEnv.Eval<LoaderInit>($"const Entrance = require('{EntranceMod}'); Entrance.Init");
        if (init != null)
        {
            init(this);
        }

        jsEnv.UsingAction<InputAction.CallbackContext>();
    }

    void OnEnable()
    {
        //RunScript();
    }

    IEnumerator Start()
    {
        RunScript();

        var customLoader = GetComponent<CustomLoader>();
        customLoader.Initialize();

        var operation = Versions.InitializeAsync();
        yield return operation;

        if (JsStart != null) JsStart();
    }

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
        //JsStart = null;
        //JsFixedUpdate = null;
        //JsUpdate = null;

        if (JsOnDestroy != null) JsOnDestroy();
        //JsOnDestroy = null;

        jsEnv.Dispose();
    }

    void OnDisable()
    {
        
    }
}
