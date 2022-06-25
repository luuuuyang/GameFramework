import { UIBase } from "core/interface"
import { ObjectManager } from "core/manager"
import { InstantiateAsync } from "core/resource"
import { TSProperties, UnityEngine } from "csharp"
import { $promise, $typeof } from "puerts"
import { GameObject, Vector3 } from "Utils/Components"
import { Item } from "./Item"

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
		for (let i = 0; i < this.maxRow; i++) {
			this.leftItems[i] = []
			this.rightItems[i] = []
			for (let j = 0; j < this.maxColumn; j++) {
				let leftItem = await ObjectManager.InstantiateAsync(Item) as Item
				leftItem.gameObject.transform.SetParent(this.leftZone.transform)
				leftItem.gameObject.transform.localScale = Vector3.one;
				leftItem.SetListener(() => {
					console.log("left", i, j)
				})
				this.leftItems[i][j] = leftItem
				
				let rightItem = await ObjectManager.InstantiateAsync(Item) as Item
				rightItem.gameObject.transform.SetParent(this.rightZone.transform)
				rightItem.gameObject.transform.localScale = Vector3.one;
				rightItem.SetListener(() => {
					console.log("right", i, j)
				})
				this.rightItems[i][j] = rightItem
			}
		}
	}
	OnDestroy(): void {
		
	}
}