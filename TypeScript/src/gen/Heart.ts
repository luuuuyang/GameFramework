import { ObjectBase } from "core/interface"
import { TSProperties } from "csharp"
import { $typeof } from "puerts"
import { GameObject } from "Utils/Components"

export enum HeartState {
	Empty, Half, Full
}

export class Heart implements ObjectBase {
	public gameObject: GameObject
	private full: GameObject
	private half: GameObject
	private empty: GameObject
	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.full = propsComponent.Pairs.get_Item(0).value
		this.half = propsComponent.Pairs.get_Item(1).value
		this.empty = propsComponent.Pairs.get_Item(2).value
	}
	
	private _state!: HeartState
	public set state(v : HeartState) {
		this.full.SetActive(v === HeartState.Full)
		this.half.SetActive(v === HeartState.Half)
		this.empty.SetActive(v === HeartState.Empty)
		this._state = v;
	}
	public get state() {
		return this._state
	}

	OnStart(): void {
		this.state = HeartState.Full
	}
	OnDestroy(): void {
		
	}
}