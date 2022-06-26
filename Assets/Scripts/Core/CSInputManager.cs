using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

public class CSInputManager : Singleton<CSInputManager>, InputActions_AutoGen.IPlayerActions
{
    public delegate void InputCallBack(InputAction.CallbackContext context);

    public InputCallBack OnEscCallback;

    public void OnEsc(InputAction.CallbackContext context)
    {
        
        OnEscCallback?.Invoke(context);
        
    }
}