import {React} from "react";



import { Typography,  CssBaseline, Button} from '@material-ui/core'

import {useDispatch} from 'react-redux';
import { toggleShow } from '../Redux/Action/toggleShow.js';

export default function Home() {

    const dispatch = useDispatch(toggleShow)
    return (
        <div className ="first-page">
            {/* <CssBaseline />  */}
            <Typography className = "Big" variant= "h1" align = "center" color = "textPrimary" style = {{marginTop : "100px"}}>Facelink Project.</Typography>
            <Button  
                variant="contained"  
                style={{backgroundColor: "#335C67",color : "#FFFCD6",left : '50%'}}
                size = "large"
                onClick={()=>dispatch(toggleShow())}
                >Scan Your Friend!</Button>
            {/* <Button variant="outlined" style={{color : "#335C67"}}>Search.</Button> */}
        </div>
    )
}



//just a home page
