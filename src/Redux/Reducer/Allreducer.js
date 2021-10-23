import ToggleShowCamReducer from './ShowCam.js'
import { combineReducers } from 'redux'


const allReducers = combineReducers({
    toggleShowCam : ToggleShowCamReducer
})



export default allReducers;