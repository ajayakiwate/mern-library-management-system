import {useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function ValidateUser(){
    const navigate = useNavigate();
    useEffect(()=>{
        axios.post("http://localhost:8000/users/validate",{usertype:localStorage.getItem("usertype"), usn:localStorage.getItem("usn")})
        .then(res=>{
           //alert(res.data);
            if(String(res.data.userType) === String("nonadmin")){
                console.log('nonadmin')
            }
            else if(String(res.data.userType) === String("admin")){
                console.log("admin")
                navigate('/home')
            }
            else{
                navigate('/login')
            }
            //console.log(res.data)
        })
    },[])

    return(<div></div>)
    
}

export default ValidateUser;