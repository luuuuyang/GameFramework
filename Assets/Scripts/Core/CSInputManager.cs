using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class CSInputManager : Singleton<CSInputManager>, InputActions_AutoGen.IPlayerActions
{
    public delegate void TsCallback(InputAction.CallbackContext context);

    public TsCallback OnKeyCallback;

    public void OnKey(InputAction.CallbackContext context)
    {
        OnKeyCallback?.Invoke(context);
    }
}