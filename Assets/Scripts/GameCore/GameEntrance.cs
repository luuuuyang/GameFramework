using System;
using UnityEngine;
using System.Collections;
using Puerts;

public class GameEntrance : MonoBehaviour
{
    static IEnumerator _WaitForSeconds(float count, Action CallBack)
    {
        yield return new WaitForSeconds(count);
        CallBack();
    }

    delegate void LoaderInit(GameEntrance levelRunner);

    public string EntranceMod = "Entrance";

    private JsEnv env;

    //public Action JsAwake;
    public Action JsStart;
    public Action JsUpdate;

    public Action JsFixedUpdate;
    public Action JsOnDestroy;

    void Awake()
    {
        if (env == null)
        {
            env = GlobalJSEnv.Env;
        }
    }

    void RunScript()
    {
        var Init = env.Eval<LoaderInit>($"const Entrance = require('{EntranceMod}');Entrance.Init", EntranceMod + ":Runner");
        if (Init != null)
        {
            Init(this);
        }

        if (JsStart != null) JsStart();
    }


    void Start()
    {
        RunScript();
    }

    // Update is called once per frame
    void Update()
    {
        env.Tick();
        if (JsUpdate != null) JsUpdate();
    }

    void FixedUpdate()
    {
        if (JsFixedUpdate != null) JsFixedUpdate();
    }

    void OnDestroy()
    {
        if (JsOnDestroy != null) JsOnDestroy();
        JsFixedUpdate = null;
        JsStart = null;
        JsUpdate = null;
        JsOnDestroy = null;
    }
}
