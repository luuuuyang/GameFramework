import { UIBase } from "core/interface"
import { ObjectManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine } from "csharp"
import { EffectNames } from "Datas/Effects"
import { $promise, $typeof } from "puerts"
import { GetCurrentTurn, GoNextTurn, InitTurnBase, RegCalculate, RegEnterTurn, SetTurnBase, StartTurn, TurnBaseState } from "System/TurnBaseSystem"
import { GameObject, Vector3 } from "Utils/Components"
import { Item, ItemType } from "./Item"

export enum Side {
	Left, Right
}

export class HUD implements UIBase {
	public gameObject: GameObject
	private leftZone: GameObject
	private leftBag: GameObject
	private rightZone: GameObject
	private rightBag: GameObject

	private readonly maxRow = 6
	private readonly maxColumn = 8

	private leftItems: Item[][] = []
	private rightItems: Item[][] = []


	constructor(gameObject: GameObject) {
		this.gameObject = gameObject
		let propsComponent = this.gameObject.GetComponent($typeof(TSProperties)) as TSProperties
		this.leftZone = propsComponent.Pairs.get_Item(0).value
		this.leftBag = propsComponent.Pairs.get_Item(1).value
		this.rightZone = propsComponent.Pairs.get_Item(2).value
		this.rightBag = propsComponent.Pairs.get_Item(3).value
	}
	
	async OnStart() {
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
		})

		//每回合结算
		RegCalculate(()=>{
			if(GetCurrentTurn()==TurnBaseState.Left){
				//设置左边状态
				console.warn("left end")
			}else{
				//设置右边状态
				console.warn("right end")
			}
		})

		//全部回合结束时运行


		for (let i = 0; i < this.maxRow; i++) {
			this.leftItems[i] = []
			this.rightItems[i] = []
			for (let j = 0; j < this.maxColumn; j++) {
				let leftItem = await ObjectManager.InstantiateAsync(Item) as Item
				leftItem.gameObject.transform.SetParent(this.leftZone.transform)
				leftItem.gameObject.transform.localScale = Vector3.one;
				
				await leftItem.SetTypeAndEffect(Side.Left,ItemType.Collect,EffectNames.Medicine)
				leftItem.SetHUD(this)
				leftItem.SetListener(() => {
					console.log("left", i, j)

					if(GetCurrentTurn()!=TurnBaseState.Left){
						return
					}
					leftItem.OpenMe(()=>{
						console.warn("Do Left")
						GoNextTurn()
					})
					
				})
				this.leftItems[i][j] = leftItem
				
				let rightItem = await ObjectManager.InstantiateAsync(Item) as Item
				rightItem.gameObject.transform.SetParent(this.rightZone.transform)
				rightItem.gameObject.transform.localScale = Vector3.one;

				await rightItem.SetTypeAndEffect(Side.Right,ItemType.Collect,EffectNames.Medicine)
				rightItem.SetHUD(this)
				rightItem.SetListener(() => {
					console.log("right", i, j)
					if(GetCurrentTurn()!=TurnBaseState.Right){
						return
					}
					rightItem.OpenMe(()=>{
						
						console.warn("Do Left")
						GoNextTurn()
					})
					
				})
				this.rightItems[i][j] = rightItem
			}
		}

		SetTurnBase(TurnBaseState.Left)
		StartTurn()
		
	}

	GetBag(side:Side):GameObject{
		if(side==Side.Left){
			return this.leftBag
		}else{
			return this.rightBag
		}
	}
	OnDestroy(): void {
		
	}
}