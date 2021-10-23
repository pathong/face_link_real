import React, {useRef, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

const UserBox = ({name}, props) =>{
    const [data,setdata] = useState([])
    useEffect(() =>{
        fetchdata();
    },[])
    const fetchdata = async ()=>{
        const data = await require('../data/data.json')
        await setdata(data["user"])
    }
    
    return(
    <div className="searchbox">

        {data.filter((val) => { 
        if(val.firstName.toString().toLowerCase().includes(name.toString().toLowerCase()) || val.lastName.toString().toLowerCase().includes(name.toString().toLowerCase())){
            return val
        }})
        .map( (val) => { return(<div className="items-search" key={val.id}  >
                                    <div className = "items-box">
                                    <Link to={`/user/${val.firstName}`}>
                                        <img  src={val.Profile_pic} alt=""/>
                                        <h3 >{val.firstName} {val.lastName}</h3>
                                    </Link>
                                    </div>
                                </div>)
                                })}
    </div>

    )
}

export default UserBox;