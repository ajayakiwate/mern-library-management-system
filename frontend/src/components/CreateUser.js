import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import { Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function CreateUser(){
    const navigate = useNavigate();

    const [usn, setUsn] = useState('')
    const [fullname, setFullName]= useState('')
    const [emailid, setEmailId] = useState('')
    const [mobileno, setMobileNo]=useState('')
    const [admin, setAdmin]= useState(false)


    const createUser =()=>{
        if(usn === "" || fullname === "" || emailid === "" || mobileno === ""){
            alert("All fields are required")
        }
        else if(mobileno.length === 10){
            axios.post(`http://localhost:8000/users/create`,{usn:usn, fullname:fullname, emailid: emailid, mobileno:mobileno, admin:admin})
            .then(res=>{
                alert(res.data.message1);
                console.log(res.data)
            })
            navigate('/usersList')
        }
        else{
            alert("Enter Valid Mobile Number(10 digits)")
        }
        
    }


    return(

        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <h2 className="text-center mt-4 mb-4">Create New User</h2>

                    <Form className="border rounded border-secondary p-4">

                        <Form.Group as={Row} className="mb-3" controlId="f1">
                            <Form.Label column sm={4}>
                            USN
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={usn} onChange={(e)=>{setUsn(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f2">
                            <Form.Label column sm={4}>
                            Full Name
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={fullname} onChange={(e)=>{setFullName(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f3">
                            <Form.Label column sm={4}>
                            EmailID
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="email" value={emailid} onChange={(e)=>{setEmailId(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f4">
                            <Form.Label column sm={4}>
                            Phone
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={mobileno} onChange={(e)=>{setMobileNo(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f4">
                            <Form.Label column sm={4}>
                            Admin
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Check
                                inline
                                label="Yes"
                                name="admin"
                                type="checkbox"
                                onClick={()=>{if(admin){setAdmin(false)}else{setAdmin(true)}}}
                            />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3 mt-4">
                            <Col sm={{ span: 10, offset: 4 }}>
                            <Button type="submit" onClick={(e)=>{e.preventDefault(); createUser()}}>Create User</Button>
                            </Col>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>  
        </Container>     
    )
}

export default CreateUser;