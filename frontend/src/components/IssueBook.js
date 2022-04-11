import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import {Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Typeahead} from 'react-bootstrap-typeahead'

function IssueBook(){
    const navigate = useNavigate();

    const [usn, setUsn] = useState('')
    const [isbn, setIsbn]= useState('')

    const [books, setBooks] = useState([])
    const [singleSelections, setSingleSelections] = useState([]);

    const [usns , setUsns]= useState([])
    const [singleSelections1, setSingleSelections1] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8000/books')
        .then(res=>{
            setBooks(res.data)
        })
        axios.get('http://localhost:8000/users')
        .then(res=>{
            setUsns(res.data)
        })
    },[])

    const issueBook =()=>{
        console.log(singleSelections[0].isbn)
        axios.post(`http://localhost:8000/users/issuebook`,{usn:singleSelections1[0].usn, isbn:singleSelections[0].isbn})
        .then(res=>{
            alert(res.data.message1);
            console.log(res.data)
        })
        
        navigate('/usersList')
    }


    return(
            <Container >

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mt-4 mb-4">Issue Book</h2>
                        <Form className="border rounded border-secondary p-4">

                            <Form.Group as={Row} className="mb-3" controlId="f1">
                                <Form.Label column sm={4}>
                                USN
                                </Form.Label>
                                <Col sm={8}>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="usn"
                                    onChange={setSingleSelections1}
                                    options={usns}
                                    placeholder="Choose USN"
                                    selected={singleSelections1}
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="f2">
                                <Form.Label column sm={4}>
                                Book Name
                                </Form.Label>
                                <Col sm={8}>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="bookname"
                                    onChange={setSingleSelections}
                                    options={books}
                                    placeholder="Select Book"
                                    selected={singleSelections}
                                />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3 mt-4">
                                <Col sm={{ span: 10, offset: 4 }}>
                                <Button type="submit" onClick={(e)=>{e.preventDefault(); issueBook()}}>Issue</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
            </Container>
  
    )
}

export default IssueBook;