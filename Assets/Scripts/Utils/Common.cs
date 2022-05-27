using System.Collections;
using System.Collections.Generic;
using UnityEngine;
#if UNITY_EDITOR
using UnityEditor;
#endif
public class Common
{
    public static void QuitGame(){
        #if UNITY_EDITOR
            EditorApplication.isPlaying = false;
        #else
            Application.Quit();
        #endif
    }

    public static void Log(string message){
        Debug.Log(message);
        uREPL.Log.Output(message.ToString());
    }

    public static void Warn(string message){
        Debug.LogWarning(message);
        uREPL.Log.Warn(message.ToString());
    }

    public static void Error(string message){
        Debug.LogError(message);
        uREPL.Log.Error(message.ToString());
    }

}
