import {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){
    const navigate = useNavigate();

    const [usn, setUsn] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{
        axios.post("http://localhost:8000/users/validate",{usertype:localStorage.getItem("usertype"), usn:localStorage.getItem("usn")})
        .then(res=>{
           //alert(res.data);
            if(String(res.data.userType) === String("nonadmin")){
                console.log('non-addmin')
                navigate('/homepage')
            }
            else if(String(res.data.userType) === String("admin")){
                console.log("admin")
                navigate('/home')
            }
            else{
                console.log("Login Page")
            }
            //console.log(res.data)
        })
    },[])

    const authenticateUser =()=>{
        if(usn === "" || password === ""){
            alert("Username or Password Cannot be Empty")
        }else{
            axios.post("http://localhost:8000/users/authenticate",{usn:usn, password:password})
            .then(res=>{
                //alert(res.data.message1);
                if(String(res.data.userType) === "nonadmin"){
                    alert(res.data.message1)
                    localStorage.setItem("usertype", res.data.token1);
                    localStorage.setItem("usn", res.data.token2);
                    navigate('/homepage')
                }
                else if(String(res.data.userType) === "admin"){
                    alert(res.data.message1)
                    localStorage.setItem("usertype", res.data.token1);
                    localStorage.setItem("usn", res.data.token2);
                    navigate('/home')
                }
                else{
                    alert(res.data.message1)
                    navigate('/login')
                }

                console.log(res.data)
            })
        }
        
    }


    return(
        <div>
                <Container >

                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        <h2 className="text-center mt-4 mb-4">Login Form</h2>
                        <Form className="border rounded border-secondary p-4">

                            <Form.Group as={Row} className="mb-3" controlId="f1">
                                <Form.Label column sm={4}>
                                USN
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="text" placeholder="USN" value={usn} onChange={(e)=>{setUsn(e.target.value)}} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="f2">
                                <Form.Label column sm={4}>
                                Password
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/> 
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3 mt-4">
                                <Col sm={{ span: 10, offset: 4 }}>
                                <Button type="submit" onClick={(e)=>{e.preventDefault(); authenticateUser()}} >Login</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>


                
        </div>

        
    )
}

export default Login;