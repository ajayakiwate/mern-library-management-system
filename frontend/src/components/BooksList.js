import {useState, useEffect} from 'react'
import axios from 'axios'

import { Table, Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function BooksList(){
    const [id, setId]=useState('')
    const [bookname, setBookName] = useState('')
    const [author, setAuthor]= useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setIsbn]=useState('')
    const [total, setTotal]= useState('')
    const [allBooks, setAllBooks] = useState()

    const [isUpdating, setIsUpdating] = useState(false)

    const editBook =()=>{
        axios.patch(`http://localhost:8000/books/${id}`,{bookname: bookname, author: author, publisher: publisher, isbn: isbn, total: total})
        .then(res=>{
            alert(res.data.message1);
            console.log(res.data)
            getAllBooks()
        })
        setIsUpdating(false)
    }

    const deleteHandler = (val)=>{
        axios.delete(`http://localhost:8000/books/${val._id}`)
        .then(res=>{
            alert(res.data.message1);
            console.log(res.data)
            getAllBooks()
        })
    }

    const editHandler = (val)=>{
        setId(val._id)
        setBookName(val.bookname)
        setAuthor(val.author)
        setPublisher(val.publisher)
        setIsbn(val.isbn)
        setTotal(val.total)
        setIsUpdating(true)
    }

    function getAllBooks(){
        axios.get("http://localhost:8000/books/")
        .then(res=>{
            setAllBooks(res.data);
        })
    }
    useEffect(()=>{
        getAllBooks()
    },[]);

    return(
        <div> 
            <Container>
            {isUpdating && <div>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 className="text-center mt-4 mb-4">Edit Book Details</h2>
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
                                <Button type="submit"onClick={(e)=>{e.preventDefault(); editBook()}}>Edit Book</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
               
            </div>}
            

            {!isUpdating && allBooks && <div> 
                <h2 className="text-center mt-4 mb-4">List of Books</h2>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Total Books</th>
                        <th>Issued Books</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                { allBooks.map((val,key)=>{
                    return  <tr key={key} >
                        <td>{val.bookname}</td>
                        <td>{val.author}</td>
                        <td>{val.publisher}</td>
                        <td>{val.isbn}</td>
                        <td>{val.total}</td>
                        <td>{val.total - val.stock}</td>
                        <td> <Button variant="primary" size="sm" onClick={()=>{editHandler(val)}}>Edit</Button></td>
                        <td> <Button variant="danger" size="sm" onClick={()=>{deleteHandler(val)}}>Delete</Button></td>
                    
                    </tr>
                    })
                }
                </tbody>

                </Table>
                </div>
            }
            </Container>
        </div>
    )
}

export default BooksList;