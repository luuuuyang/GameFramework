import { TsBehaviour } from "interface/TsBehaviour";
import { UIBase } from "interface/UIBase";

type Constructor<T> = new(...args: any[]) => T

abstract class Factory {
    public abstract new(ctor: Constructor<TsBehaviour>): TsBehaviour;
}

class UIManager extends Factory {
    public new(ctor: Constructor<UIBase>): UIBase {
        return new ctor()
    }
}