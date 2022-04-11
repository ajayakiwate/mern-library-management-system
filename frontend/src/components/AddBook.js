import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import { Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AddBook(){
    const navigate = useNavigate();

    const [bookname, setBookName] = useState('')
    const [author, setAuthor]= useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setIsbn]=useState('')
    const [total, setTotal]= useState('')
/*
    useEffect(()=>{
        axios.post("http://localhost:8000/users/validate",{usertype:localStorage.getItem("usertype"), usn:localStorage.getItem("usn")})
        .then(res=>{
           console.log(res.data);
            if(String(res.data.userType) == String("nonadmin")){
                console.log('nonaddmin')
                navigate('/login')
            }
            else if(String(res.data.userType) == String("admin")){
                console.log("admin")
            }
            else{
                navigate('/login')
            }
            //console.log(res.data)
        })
    },[])
*/
    const addBook =()=>{
        if(bookname === "" || author === "" || publisher === "" || isbn ==="" || total === ""){
            alert("All Fields are required")
        }
        else{
            axios.post(`http://localhost:8000/books`,{bookname: bookname, author: author, publisher: publisher, isbn: isbn, total: total})
            .then(res=>{
                alert(res.data.message1);
                console.log(res.data)
            })
            
            navigate('/booksList')
        }
        
    }


    return(
        <Container>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>

                    <h2 className="text-center mt-4 mb-4">Add New Book</h2>

                    <Form className="border rounded border-secondary p-4">

                        <Form.Group as={Row} className="mb-3" controlId="f1">
                            <Form.Label column sm={4}>
                            Book Name
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={bookname} onChange={(e)=>{setBookName(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f2">
                            <Form.Label column sm={4}>
                            Author
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={author} onChange={(e)=>{setAuthor(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f3">
                            <Form.Label column sm={4}>
                            Publisher
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={publisher} onChange={(e)=>{setPublisher(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f4">
                            <Form.Label column sm={4}>
                            ISBN
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="text" value={isbn} onChange={(e)=>{setIsbn(e.target.value)}} required/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="f4">
                            <Form.Label column sm={4}>
                            Total Books
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control type="number" value={total} onChange={(e)=>{setTotal(e.target.value)}} required/>
                            </Col>
                        </Form.Group>


                        <Form.Group as={Row} className="mb-3 mt-4">
                            <Col sm={{ span: 10, offset: 4 }}>
                            <Button type="submit" onClick={(e)=>{e.preventDefault(); addBook()}}>Add Book</Button>
                            </Col>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
                
        </Container>     
    )
}

export default AddBook;