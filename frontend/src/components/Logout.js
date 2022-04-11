import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

function Logout(){
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.removeItem("usertype");
        localStorage.removeItem("usn");
        alert("User Loged out")
        navigate('/')
    },[]);

    return(<div></div>);
}

export default Logout;