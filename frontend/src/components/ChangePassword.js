import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


import { Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function ChangePassword(){
    const navigate = useNavigate();

    const [usn, setUsn] = useState(localStorage.getItem("usn")) 
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword]= useState('')
    const [newPassword1, setNewPassword1]= useState('')


    const changePassword =()=>{
        if(usn === "" || oldPassword === "" || newPassword === "" || newPassword1 === ""){
            alert("All Fields are required")
        }
        else if(newPassword === newPassword1){
            axios.post("http://localhost:8000/users/changepassword",{usn:usn, oldPassword:oldPassword, newPassword: newPassword})
            .then(res=>{
            //alert(res.data.message1);
                alert(res.data.message1)
                navigate('/logout')
                console.log(res.data)
            })
        }
        else{
            alert("Warning: New passwords don't match")
        }   
    }


    return(
        <div>

            <Container >

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mt-4 mb-4">Change Password</h2>
                        <Form className="border rounded border-secondary p-4">

                            <Form.Group as={Row} className="mb-3" controlId="f1">
                                <Form.Label column sm={4}>
                                USN
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="text" placeholder="USN" value={usn} onChange={(e)=>{setUsn(e.target.value)}} disabled />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="f2">
                                <Form.Label column sm={4}>
                                Current Password
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="password" placeholder="Current Password" value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} required/> 
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="f3">
                                <Form.Label column sm={4}>
                                New Password
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} required/>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="f4">
                                <Form.Label column sm={4}>
                                Retype Password
                                </Form.Label>
                                <Col sm={8}>
                                <Form.Control type="password" placeholder="Retype Password" value={newPassword1} onChange={(e)=>{setNewPassword1(e.target.value)}} required/>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3 mt-4">
                                <Col sm={{ span: 10, offset: 4 }}>
                                <Button type="submit" onClick={(e)=>{e.preventDefault(); changePassword()}}>Update</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default ChangePassword;