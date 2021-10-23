const ToggleShowCamReducer = (state = false, action)=>{
    switch(action.type){
        case 'Show':
            return !state
        default:
            return state
    }
}


export default ToggleShowCamReducer;