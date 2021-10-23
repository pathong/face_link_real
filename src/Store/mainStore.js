import {createStore} from 'redux';


const ToogleShowReducer = (state = false, action) => {  
    switch(action.type){
        case 'SHOW':
            return !state
        default :
            return state
    }
}