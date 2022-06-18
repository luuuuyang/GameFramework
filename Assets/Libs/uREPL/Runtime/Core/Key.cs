using UnityEngine;
using System.Collections.Generic;
using UnityEngine.InputSystem;

namespace uREPL
{

public static class KeyUtil
{
    public static bool Shift()
    {
        return Keyboard.current[Key.LeftShift].isPressed || Keyboard.current[Key.RightShift].isPressed;
    }

    public static bool Alt()
    {
        return Keyboard.current[Key.LeftAlt].isPressed || Keyboard.current[Key.RightAlt].isPressed;
    }

    public static bool Control()
    {
        return Keyboard.current[Key.LeftCtrl].isPressed || Keyboard.current[Key.RightCtrl].isPressed;
    }

    public static bool ControlOrShift()
    {
        return Control() || Shift();
    }

    public static bool Enter()
    {
        return Keyboard.current[Key.Enter].wasPressedThisFrame || Keyboard.current[Key.NumpadEnter].wasPressedThisFrame;
    }
}


public class KeyEvent
{
    private const int holdInputStartDelay = 30;
    private const int holdInputFrameInterval = 5;

    public enum Option { None, Ctrl, Shift, Alt, CtrlOrShift };

    public delegate void KeyEventHandler();
    class EventInfo
    {
        public Key key;
        public Option option;
        public int counter;
        public System.Action onKeyEvent;
        public EventInfo(Key key, Option option, System.Action onKeyEvent)
        {
            this.key = key;
            this.option = option;
            this.counter = 0;
            this.onKeyEvent = onKeyEvent;
        }
    }
    private List<EventInfo> keyEventList_ = new List<EventInfo>();

    public void Add(Key code, Option option, System.Action onKeyEvent)
    {
        keyEventList_.Add(new EventInfo(code, option, onKeyEvent));
    }

    public void Add(Key code, System.Action onKeyEvent)
    {
        Add(code, Option.None, onKeyEvent);
    }

    public void Check()
    {
        foreach (var info in keyEventList_) {
            if (CheckKey(info)) info.onKeyEvent();
        }
    }

    private bool CheckKey(EventInfo info)
    {
        bool option = false;
        switch (info.option) {
            case Option.None        : option = true;                     break;
            case Option.Ctrl        : option = KeyUtil.Control();        break;
            case Option.Shift       : option = KeyUtil.Shift();          break;
            case Option.Alt         : option = KeyUtil.Alt();            break;
            case Option.CtrlOrShift : option = KeyUtil.ControlOrShift(); break;
        }

        if (Keyboard.current[info.key].isPressed && option) {
            ++info.counter;
        } else {
            info.counter = 0;
        }

        return
            info.counter == 1 || (
                (info.counter >= holdInputStartDelay) && 
                (info.counter % holdInputFrameInterval == 0));
    }

    public void Clear()
    {
        foreach (var info in keyEventList_) {
            info.counter = 0;
        }
    }
}

}