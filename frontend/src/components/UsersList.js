import {useState, useEffect} from 'react'
import axios from 'axios'

import { Table,Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Link} from 'react-router-dom'

function UsersList(){
    const [id, setId]=useState('')
    const [usn, setUsn] = useState('')
    const [fullname, setFullName]= useState('')
    const [emailid, setEmailId] = useState('')
    const [mobileno, setMobileNo]=useState('')
    const [admin, setAdmin]= useState(false)

    const [allUsers, setAllUsers] = useState()

    const [isUpdating, setIsUpdating] = useState(false)

    const editUser =()=>{
        axios.patch(`http://localhost:8000/users/${id}`,{usn:usn, fullname:fullname, emailid: emailid, mobileno:mobileno, admin:admin})
        .then(res=>{
            alert(res.data.message1);
            console.log(res.data)
            getAllUsers()
        })
        setIsUpdating(false)
       
    }

    function getAllUsers(){
        axios.get("http://localhost:8000/users/")
        .then(res=>{
            setAllUsers(res.data);
            console.log(res.data);
        })
    }

    const deleteHandler = (val)=>{
        axios.delete(`http://localhost:8000/users/${val._id}`)
        .then(res=>{
            alert(res.data.message1);
            console.log(res.data)
            getAllUsers()
        })
       

    }

    const editHandler = (val)=>{
        setId(val._id)

        setUsn(val.usn)
        setFullName(val.fullname)
        setEmailId(val.emailid)
        setMobileNo(val.mobileno)
        setAdmin(val.admin)

        setIsUpdating(true)
    }

    useEffect(()=>{
        getAllUsers()
    },[]);

    return(
        <Container>
            {isUpdating && <div>

                
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
                                defaultChecked={admin}
                            />
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3 mt-4">
                            <Col sm={{ span: 10, offset: 4 }}>
                            <Button type="submit" onClick={(e)=>{e.preventDefault(); editUser()}}>Update User</Button>
                            </Col>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>  
               
            </div>}

          

            {!isUpdating && allUsers && <div>
                
                <h2 className="text-center mt-4 mb-4">List of Users</h2>

                <Table striped bordered hover>
               
                <thead>
                    <tr>
                        <th>USN</th>
                        <th>Full Name</th>
                        <th>EmailID</th>
                        <th>Phone</th>
                        <th>Admin</th>
                        <th>Fine</th>
                        <th>Books Issued</th>
                        <th>Books Returned</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                { allUsers.map((val,key)=>{
                    return  <tr key={key} >
                        <td>{val.usn}</td>
                        <td>{val.fullname}</td>
                        <td>{val.emailid}</td>
                        <td>{val.mobileno}</td>
                        <td>{String(val.admin)}</td>
                        <td>{val.fine}</td>
                        <td><Link to={`../booksCurrenntlyIssued/${val.usn}`}>{Object.values(val.books).filter(element => element.received === false).length}</Link></td>
                        <td><Link to={`../booksCurrenntlyCollected/${val.usn}`}>{Object.values(val.books).filter(element => element.received === true).length}</Link></td>
                        <td><Button variant="primary" size="sm" onClick={()=>{editHandler(val)}}>Edit</Button></td>
                        <td><Button variant="danger" size="sm" onClick={()=>{deleteHandler(val)}}>Delete</Button></td>
                    
                    </tr>
                })
                }
                </tbody>

                </Table></div>
            }
       </Container>
    )
}

export default UsersList;