let GlobalCanClick = false

function LockClick(){
    GlobalCanClick = false
}

function UnlockClick(){
    GlobalCanClick = true
}

function CanClick(){
    return GlobalCanClick
}

export{
    LockClick,
    UnlockClick,
    CanClick
}