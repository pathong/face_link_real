import React, { useState, useEffect } from 'react';
import data from '../data/data.json'
import { Typography , IconButton, Container, Button, theme} from '@material-ui/core';


// Icon
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
// import Pdf_Thumpnail from './pdf_thumnail';
import MyPDF1 from '../data/PJ62447_เล่มเต็ม.docx (1).pdf';
import MyPDF2 from '../data/NSC.docx'

import Thumbnail_img1 from '../data/1631878712924.jpg'
import Thumbnail_img2 from '../data/1631887652650.jpg'



export default function Template({ match }) {

    const [data_user, set_data_user] = useState({});

    useEffect(() => {
        GetData();
        console.log(match)
        
    },[{match}]);


    const GetData = async () =>{
        const raw_data = await require('../data/data.json');

        raw_data["user"].forEach(item => {
            if(item.firstName === match.params.firstName){
                set_data_user(item);
            }
        });
        

    }

    const styleForButton = {
        'width' : '30px',
        'height' : '30px',
        'color' : '#0E3A56',
    };

    const styleForDescription = {
        paragraph : 'true',
        'color' : 'gray',

    }


    const styles = theme => ({
        button: {
          height: 95, // setting height/width is optional
        },
        label: {
          // Aligns the content of the button vertically.
            flexDirection: 'column'
        },
        icon: {
            fontSize: '32px !important',
            marginBottom: theme.spacing.unit
        }
    })
    
    return (
        <div>
            <div className="userPage">
                <img className="profile-picture" src={data_user.Profile_pic}/>
                <div>


                    <h1 className = "TypoTemplate-h1"  >
                        {data_user.firstName} {data_user.lastName}
                    </h1>
                    <Container size='sm' style={{margin : '10px',width : "80%"}}>
                        <Typography variant="h8" style = {styleForDescription}  paragraph={true}>
                            {data_user.description}
                        </Typography>
                            
                    </Container>            
                    <ul>
                        <IconButton
                            color = "primary" 
                            size='small' 
                            onClick={() => window.open(data_user.facebook, "_blank")}
                            >
                            <FacebookIcon style={styleForButton}/>
                        </IconButton>
                        <IconButton 
                            color = "primary"       
                            size='small' 
                            onClick={() => window.open(data_user.instagram, "_blank")}
                            
                            >
                            <InstagramIcon style={styleForButton}/>
                        </IconButton>
                        <IconButton 
                            color = "primary" 
                            size='small' 
                            onClick={() => window.open(data_user.twitter, "_blank")}
                            >
                            <TwitterIcon style={styleForButton}/>
                        </IconButton>
                        <IconButton 
                            color = "primary" 
                            size='small' 
                            onClick={() => window.open(data_user.linkedin, "_blank")}
                            >
                            <LinkedInIcon style={styleForButton}/>
                        </IconButton>
                        <Button 
                            startIcon={<EmailIcon style={styleForButton}/> } 
                            color='#335C67'
                            style={{ fontSize: '90%',textTransform: 'none' }}
                            onClick={() => navigator.clipboard.writeText(data_user.email)}
                            >
                            : {data_user.email}
                        </Button>
                        <Button 
                            startIcon={<PhoneIcon style={styleForButton}/> } 
                            color='#335C67'
                            style={{ fontSize: '90%',textTransform: 'none' }}
                            onClick={() => navigator.clipboard.writeText(data_user.phone)}
                            >
                            : {data_user.phone}
                        </Button>
                    </ul>
                </div>
            </div>


            
            <Container>
                <a href={MyPDF1} target="_blank" download>
                    <Button
                        style={{
                            flexDirection : 'column',
                            color : '#335C67'
                        }}
                        variant="raised"
                        startIcon={<img src={Thumbnail_img1} width='200'/>}
                    >
                        โครงานวิทยาศาตร์
                    </Button>
                </a>
                <a href={MyPDF2} target="_blank" download>
                    <Button
                        style={{
                            flexDirection : 'column',
                            color : '#335C67'
                        }}
                        variant="raised"
                        startIcon={<img src={Thumbnail_img2} width='200'/>}
                    >
                        นวัตกรรมวิทยาศาตร์
                    </Button>
                </a>

            </Container>
        </div>
        
    )
}





// #335C67