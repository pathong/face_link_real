import React, {useState, useEffect } from 'react';

// link
import { Link } from 'react-router-dom'


// material UI
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import 'react-html5-camera-photo/build/css/index.css';
import {Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Contaiener, Container, createTheme, Icon} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';



//image Uploader
import ImageUploading from "react-images-uploading";

// camera
import Camera,{ FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

// // webcam camera
// import Webcam from 'react-webcam';

import Webcam_block from '../components/WebcamBlock.js';
import UserBox from '../components/UserBox.js'



// Redux
import { useSelector , useDispatch} from 'react-redux';
import { toggleShow } from '../Redux/Action/toggleShow.js';



export default function Nav() {
    const [data, setdata] = useState([])
    const [search,setsearch] = useState("")
    const [toggle_capture, settoggle_capture] = useState(false)
    const [CanshowBox, setCanshowBox] = useState(false);

    useEffect(() =>{
        fetchdata();
    },[])

    const fetchdata = async ()=>{
        const data = await require('../data/data.json')
        await setdata(data["user"])
    }

    const inputHandler =(e)=>{
        setsearch(e.target.value)
    }


    useEffect(() =>{
      if(search.length === 0){
        setCanshowBox(false);
      }
      if(search.length > 0){
        setCanshowBox(true);
      }
    },[search])


    const styleForCamera = {
      'background-color' : "#fac957",
      'color':'#335c67',
      'borderRadius' : '50'
    }

    const dispatch = useDispatch()
    const toggleCapture = useSelector(state => state.toggleShowCam)
    // console.log(toggleCapture)

    const theme = createTheme({
      typography: {
        fontFamily: [
          'Balsamiq Sans',
          'ursive'
        ].join(','),
      },

    });
    return (
        <div className="Nav">
            
            <Link to={`/`}>
              <Container                  
                  style={{
                    'display' : 'flex',
                    'flexDirection' : 'row',
                    'alignItems' : 'center'
                  }}>
                <ControlCameraIcon style={{
                  'color' : 'white', 
                  
                  }}/>
                <Typography 
                  theme={theme} 
                  style={{
                    'color' : 'white',
                    'fontFamily' : 'Balsamiq Sans',
                    'fontSize' : '40px',
                    'marginLeft' : '20px'
                  }}
                  >Face Link</Typography>
              </Container>
              
            </Link>
            <div className="searchbar"> 
              <input 
                type="search" 
                className="searchinput" 
                onChange = {inputHandler} 
                value = {search} 
                placeholder="Username"
              />
              { CanshowBox ? <UserBox name = {search}/> : null }
              <IconButton 
                style={styleForCamera} 
                aria-label="Camera" 
                onClick={()=>dispatch(toggleShow())} variant="contained"
              >
                <CameraAltIcon />
              </IconButton> 

              { toggleCapture ?  <Container maxWidth="sm">
                                    <div className = "bg-blend">
                                    </div>
                                    <Webcam_block 
                                      onChange={
                                        (value) => setsearch(value)
                                      }/>
                                  </Container> : null}
              
            </div>
            
        </div>
    )
}


// const UserBox = ({name}, props) =>{
//   const [data,setdata] = useState([])
//   useEffect(() =>{
//       fetchdata();
//   },[])
//   const fetchdata = async ()=>{
//       const data = await require('../data/data.json')
//       await setdata(data["user"])
//   }
  
//   return(
//     <div className="searchbox">

//       {data.filter((val) => { 
//         if(val.firstName.toString().toLowerCase().includes(name.toString().toLowerCase()) || val.lastName.toString().toLowerCase().includes(name.toString().toLowerCase())){
//           return val
//         }})
//         .map( (val) => { return(<div className="items-search" key={val.id}  >
//                                   <div className = "items-box">
//                                     <Link to={`/user/${val.firstName}`}>
//                                       <img  src={val.Profile_pic} alt=""/>
//                                       <h3 >{val.firstName} {val.lastName}</h3>
//                                     </Link>
//                                   </div>
//                                 </div>)
//                               })}
//     </div>

//   )
// }



// const Webcam_block = (props) => {
//     const [imgSrc, setImgSrc] = React.useState(null);
//     const [Name,setName] = useState("");

//     useEffect(() => {
//       if(imgSrc !== null){
//         send();
//       }
//     },[imgSrc])

//     useEffect(() =>{
//       props.onChange(Name)
//     },[Name])

//     const onChange_upload = (imageList) => {
//       setImgSrc(imageList["0"]["dataURL"]);
//     };    

//     const send = async () =>{
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: imgSrc })
//       };
//       fetch('/get_data', requestOptions)      
//         .then(response => response.json())
//         .then(mes => setName(mes["success"]))
//         // .then(mes => console.log({Name}))
//       }

//     const handleTakePhoto = (dataUri) => {

//       setImgSrc(dataUri);
//     }


//     const styleForCamera = {
//       'background-color' : "#fac957",
//       'color':'#335c67',
//       'borderRadius' : '20px'
//     }


//     const styleForButton = {
//       "position" : "absolute",
//       // right : "0%",
//       // up : "0%"
//     }

//     return (
//       <div className="box">

//         {/* camera component */}

//         <Camera
//           onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } 
//           idealFacingMode = {FACING_MODES.ENVIRONMENT}
//           imageType = {IMAGE_TYPES.JPG}
//           isSilentMode = {true}
//           isImageMirror = {false}
//         />

//         {/* image uploading components */}

//         <div className="iamgeUploader">
//           <ImageUploading onChange={onChange_upload} dataURLKey="dataURL">
//               {({ onImageUpload }) => (

//                 // write your building UI
//                 <div className="upload__image-wrapper">
//                     <Button style ={styleForCamera} onClick={onImageUpload}>Click or Drop here</Button>
//                 </div>

//               )}
//           </ImageUploading>
          
//         </div>

//         {/* Close button */}

//         {/* <IconButton >
//           <CancelIcon/>
//         </IconButton> */}
//       </div>
//     );
// }





