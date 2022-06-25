import { System } from "csharp"

let TurnBaseState = {
    Left : 1,
    Right : 2,
    NONE:0
}

let calculate:System.Action|null = null
let enterTurn:System.Action|null = null
let endAllTurn:System.Action|null = null

let currentTurn = TurnBaseState.NONE

function InitTurnBase(){
    currentTurn = TurnBaseState.NONE
    calculate = null
    enterTurn = null
    endAllTurn = null
}

function SetTurnBase(state:number){
    currentTurn = state
}

function RegCalculate(act:System.Action){
    calculate = act
}

function RegEnterTurn(act:System.Action){
    enterTurn = act
}

function RegEndAllTurn(act:System.Action){
    endAllTurn = act
}

function GoNextTurn(){

    if(currentTurn == TurnBaseState.NONE){
        return
    }

    if(calculate!=null){
        calculate()
    }

    if(currentTurn == TurnBaseState.Left){
        currentTurn = TurnBaseState.Right
    }else if(currentTurn == TurnBaseState.Right){
        currentTurn = TurnBaseState.Left
    }

    if(enterTurn!=null){
        enterTurn()
    }

}

function StartTurn(){
    if(enterTurn!=null){
        enterTurn()
    }
}

function EndAllTurn(){
    currentTurn = TurnBaseState.NONE
    if(endAllTurn!=null){
        endAllTurn()
    }
}

function GetCurrentTurn(){
    return currentTurn
}

export{
    TurnBaseState,
    InitTurnBase,
    SetTurnBase,
    RegCalculate,
    RegEnterTurn,
    GoNextTurn,
    EndAllTurn,
    RegEndAllTurn,
    StartTurn,
    GetCurrentTurn

}