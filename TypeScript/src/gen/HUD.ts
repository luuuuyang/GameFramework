import { UIBase } from "core/interface"
import { ObjectManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine } from "csharp"
import { EffectNames } from "Datas/Effects"
import { $promise, $typeof } from "puerts"
import { CanClick, LockClick, UnlockClick } from "System/ClickController"
import { GetCurrentTurn, GoNextTurn, InitTurnBase, RegCalculate, RegEndAllTurn, RegEnterTurn, SetTurnBase, StartTurn, TurnBaseState } from "System/TurnBaseSystem"
import { GameObject, Vector3 } from "Utils/Components"
import { JumpOut } from "utils/SimpleAnimation"
import { T } from "utils/Utils"
import { BagItem } from "./BagItem"
import { Heart, HeartState } from "./Heart"
import { Item, ItemType } from "./Item"


export enum Side {
	Left, Right
}

enum HeartMode {
	Whole, Half
}

export class HUD implements UIBase {
	public gameObject: GameObject
	private leftHeartBar: GameObject
	private leftZone: GameObject
	private leftBag: GameObject
	private rightZone: GameObject
	private rightBag: GameObject
	private rightHeartBar: GameObject

	private readonly maxRow = 6
	private readonly maxColumn = 8

	private leftItems: Item[][] = []
	private rightItems: Item[][] = []

	private LeftItemsLinear: Array<Item> =[]
	private RightItemsLinear: Array<Item> =[]

	private _leftHeartValue!: number
	private set leftHeartValue(value: number) {
		value = Math.max(0, Math.min(this.heartInitValue, value))
		this._leftHeartValue = value
		this._leftHeartCount = value / 2
	}
	private get leftHeartValue() {
		return this._leftHeartValue
	}

	private _rightHeartValue!: number
	private set rightHeartValue(value: number) {
		value = Math.max(0, Math.min(this.heartInitValue, value))
		this._rightHeartValue = value
		this._rightHeartCount = value / 2
	}
	private get rightHeartValue() {
		return this._rightHeartValue
	}

	private _leftHeartCount!: number
	private get leftHeartCount() {
		return this._leftHeartCount
	}

	private _rightHeartCount!: number
	private get rightHeartCount() {
		return this._rightHeartCount
	}

	private heartMode = HeartMode.Whole
	private leftHearts = new Array<Heart>()
	private rightHearts = new Array<Heart>()
	private readonly heartInitCount = 6
	private readonly heartInitValue = this.heartInitCount * 2

	public ModifyHeart(side: Side, value: number) {
		if (value !== 0) {
			value = this.heartMode == HeartMode.Whole ? 2 * value : value
			switch (side) {
				case Side.Left:
					this.leftHeartValue = this.leftHeartValue + value
					let tmpLeftHeartValue = this.leftHeartValue
					for (let i = 0; i < this.heartInitCount; i++) {
						const heart = this.leftHearts[i]
						if (tmpLeftHeartValue >= 2) {
							heart.state = HeartState.Full
						}
						else if (tmpLeftHeartValue == 1) {
							heart.state = HeartState.Half
						}
						else {
							heart.state = HeartState.Empty
						}
						tmpLeftHeartValue -= 2
					}
					break;
				case Side.Right:
					this.rightHeartValue = this.rightHeartValue + value
					let tmpRightHeartValue = this.rightHeartValue
					for (let i = this.heartInitCount - 1; i >= 0; i--) {
						const heart = this.rightHearts[i]
						if (tmpRightHeartValue > 2) {
							heart.state = HeartState.Full
						}
						else if (tmpRightHeartValue == 1) {
							heart.state = HeartState.Half
						}
						else {
							heart.state = HeartState.Empty
						}
						tmpRightHeartValue -= 2
					}
					break;
			}
		}
	}

	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.leftZone = propsComponent.Pairs.get_Item(0).value
		this.leftBag = propsComponent.Pairs.get_Item(1).value
		this.rightZone = propsComponent.Pairs.get_Item(2).value
		this.rightBag = propsComponent.Pairs.get_Item(3).value
		this.leftHeartBar = propsComponent.Pairs.get_Item(4).value
		this.rightHeartBar = propsComponent.Pairs.get_Item(5).value
		let canvas = (this.gameObject.GetComponent(T(UnityEngine.Canvas)) as UnityEngine.Canvas)
		canvas.worldCamera = UnityEngine.Camera.main
	}
	
	async OnStart() {
		const InstantiateHeart = async () => {
			for (let i = 0; i < this.heartInitCount; i++) {
				let leftHeart = await ObjectManager.InstantiateAsync(Heart) as Heart
				this.leftHearts.push(leftHeart)
				let rightHeart = await ObjectManager.InstantiateAsync(Heart) as Heart
				this.rightHearts.push(rightHeart)
			}
		}
		const InitializeHeart = () => {
			this.leftHeartValue = this.heartInitValue
			this.rightHeartValue = this.heartInitValue
			this.leftHearts.forEach(heart => {
				heart.gameObject.transform.SetParent(this.leftHeartBar.transform)
				heart.gameObject.transform.localScale = Vector3.one
			})
			this.rightHearts.forEach(heart => {
				heart.gameObject.transform.SetParent(this.rightHeartBar.transform)
				heart.gameObject.transform.localScale = Vector3.one
			})
		}

		await InstantiateHeart()
		InitializeHeart()

		console.log("HUD Onstart")

		//完全初始化回合
		InitTurnBase()

		//每回合开始前运行
		RegEnterTurn(()=>{
			if(GetCurrentTurn()==TurnBaseState.Left){
				//设置左边状态
				console.warn("prepare left")
			}else{
				//设置右边状态
				console.warn("prepare right")
			}
			// this.leftBag.SetActive(GetCurrentTurn()==TurnBaseState.Left)
			// this.rightBag.SetActive(GetCurrentTurn()==TurnBaseState.Right)
			UnlockClick()
		})

		//每回合结算
		RegCalculate(()=>{
			LockClick()
			if(GetCurrentTurn()==TurnBaseState.Left){
				//设置左边状态
				console.warn("left end")
			}else{
				//设置右边状态
				console.warn("right end")
			}
		})

		//全部回合结束时运行
		RegEndAllTurn(()=>{

		})


		for (let i = 0; i < this.maxRow; i++) {
			this.leftItems[i] = []
			this.rightItems[i] = []

			this.LeftItemsLinear = []

			this.RightItemsLinear = []

			for (let j = 0; j < this.maxColumn; j++) {
				let leftItem = await ObjectManager.InstantiateAsync(Item) as Item
				leftItem.gameObject.transform.SetParent(this.leftZone.transform)
				leftItem.gameObject.transform.localScale = Vector3.one;
				
				await leftItem.SetTypeAndEffect(Side.Left,ItemType.Immediate,EffectNames.ShowContent)
				leftItem.SetHUD(this)
				leftItem.SetListener(() => {
					if(!CanClick()){
						return
					}
					console.log("left", i, j)

					if(GetCurrentTurn()!=TurnBaseState.Left){
						return
					}

					if(leftItem.isOpen){
						return
					}
					LockClick()
					leftItem.OpenMe(()=>{
						console.warn("Do Left")
						GoNextTurn()
					})
					
				})
				this.leftItems[i][j] = leftItem
				this.LeftItemsLinear.push(leftItem)
				
				let rightItem = await ObjectManager.InstantiateAsync(Item) as Item
				rightItem.gameObject.transform.SetParent(this.rightZone.transform)
				rightItem.gameObject.transform.localScale = Vector3.one;

				await rightItem.SetTypeAndEffect(Side.Right,ItemType.Immediate,EffectNames.ShowContent)
				rightItem.SetHUD(this)
				rightItem.SetListener(() => {

					if(!CanClick()){
						return
					}

					console.log("right", i, j)
					if(GetCurrentTurn()!=TurnBaseState.Right){
						return
					}

					if(rightItem.isOpen){
						return
					}
					LockClick()
					rightItem.OpenMe(()=>{
						
						console.warn("Do Right")
						GoNextTurn()
					})
					
				})
				this.rightItems[i][j] = rightItem
				this.RightItemsLinear.push(rightItem)
			}
		}

		SetTurnBase(TurnBaseState.Left)
		StartTurn()
		
	}

	async AddBag(side: Side, item: Item) {
		let leftScrollRect = this.leftBag.GetComponent($typeof(UnityEngine.UI.ScrollRect)) as UnityEngine.UI.ScrollRect
		let bagItem = await ObjectManager.InstantiateAsync(BagItem) as BagItem
		bagItem.gameObject.transform.SetParent(leftScrollRect.content)
		bagItem.gameObject.transform.localScale = Vector3.one
		bagItem.CopyItem(item, () => {
			GoNextTurn()
		})
		bagItem.SetHUD(this)
	}

	GetBag(side:Side):GameObject{
		if(side==Side.Left){
			return this.leftBag
		}else{
			return this.rightBag
		}
	}

	GetHealth(side:Side):GameObject{
		if(side==Side.Left){
			return this.leftHeartBar
		}else{
			return this.rightHeartBar
		}
	}

	GetUnOpenBox(side:Side,num:number):Array<Item>{
		let rt:Array<Item> = []
		let items:Array<Item> = []
		if(side==Side.Left){
			items = this.LeftItemsLinear
		}else if(side == Side.Right){
			items = this.RightItemsLinear
		}

		for(let i = 0;i<items.length;i++){
			if(!items[i].isOpen){
				rt.push(items[i])
			}
			if(rt.length>=num){
				break
			}
		}
		return rt
	}

	OnDestroy(): void {
		
	}
}