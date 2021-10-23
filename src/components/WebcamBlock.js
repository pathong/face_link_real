import React, {useState, useEffect ,useCallback } from 'react';

// link
import { Link } from 'react-router-dom'

// material UI
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import IconButton from '@material-ui/core/IconButton';
import 'react-html5-camera-photo/build/css/index.css';
import { Typography, AppBar, Button, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Contaiener, Container} from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';

//image Uploader
import ImageUploading from "react-images-uploading";


// camera
import Camera,{ FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

// // webcam camera
// import Webcam from 'react-webcam';


// redux
import {useDispatch} from 'react-redux';
import { toggleShow } from '../Redux/Action/toggleShow.js';
const Webcam_block = (props) => {
    const [imgSrc, setImgSrc] = React.useState(null);
    const [Name,setName] = useState("");

    useEffect(() => {
    if(imgSrc !== null){
        send();
    }
    },[imgSrc])

    useEffect(() =>{
    props.onChange(Name)
    },[Name])

    const onChange_upload = (imageList) => {
    setImgSrc(imageList["0"]["dataURL"]);
    };    

    const send = async () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: imgSrc })
        };
        fetch('/get_data', requestOptions)      
            .then(response => response.json())
            .then(mes => setName(mes["success"]))
            // .then(mes => console.log({Name}))
    }

    const handleTakePhoto = (dataUri) => {
    setImgSrc(dataUri);
    }


    const styleForCamera = {
    'background-color' : "#fac957",
    'color':'#335c67',
    'borderRadius' : '20px'
    }

    const styleForButton = {
    "position" : "absolute",

    }


    const dispatch = useDispatch(toggleShow)
    
    const escFunction = useCallback((event) => {
        if(event.keyCode === 27) {
            dispatch(toggleShow())
        }
    }, []);
        
    useEffect(() => {
        document.addEventListener("keydown", escFunction, false);
    
        return () => {
        document.removeEventListener("keydown", escFunction, false);
        };
    }, []);

    return (
    <div className="box">

        {/* camera component */}

        <Camera
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } } 
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        imageType = {IMAGE_TYPES.JPG}
        isSilentMode = {true}
        isImageMirror = {false}
        />

        {/* image uploading components */}

        <div className="iamgeUploader">
        <ImageUploading 
            onChange={onChange_upload} 
            dataURLKey="dataURL">
            {({ onImageUpload }) => (

                // write your building UI
                <div className="upload__image-wrapper">
                    <Button 
                        style ={styleForCamera} 
                        onClick={onImageUpload}>
                            Click or Drop here
                    </Button>
                </div>

            )}
        </ImageUploading>
        </div>
    </div>
    );
}

export default Webcam_block