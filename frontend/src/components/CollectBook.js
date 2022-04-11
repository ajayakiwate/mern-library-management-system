import {useState, useEffect} from 'react'
import axios from 'axios'

import {Table,Container, Form, Row, Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import {Typeahead} from 'react-bootstrap-typeahead'

function CollectBook(){
    const [usns , setUsns]= useState([])
    const [usn, setUsn]= useState('')
    const [books, setBooks] = useState()
    const [isUpdating, setIsUpdating]= useState(false)
    const [singleSelections, setSingleSelections] = useState([]);

     const booksList = ()=>{
         console.log(singleSelections[0].usn)
         axios.get(`http://localhost:8000/users/${singleSelections[0].usn}`)
        .then(res=>{
            setBooks("")
            if(res.data.success){
                var t = res.data.books;
                var tbook = JSON.parse(JSON.stringify(t))
                for(var b in tbook){
                    var temp =0;
                    if(tbook[b].received){
                        temp = Math.floor(Math.abs(((new Date(tbook[b].submitdate) - new Date(tbook[b].issuedate))/(1000*24*60*60))))
                    }
                    else{
                        temp = Math.floor(Math.abs(((new Date() - new Date(tbook[b].issuedate))/(1000*24*60*60))))
                    }

                    if(temp > 30){
                        tbook[b].fineamount = (temp - 30) * 5 ;
                    }
                    else{
                        tbook[b].fineamount = 0;
                    }
                }
                setBooks(tbook.reverse()) 
            }
            else{
                alert("Invalid USN")
            }
           
        })
        setIsUpdating(true)
    }

    const collectBookHandler = (val)=>{
        axios.post('http://localhost:8000/users/collectbook',{ibid:val._id})
        .then(res=>{
            booksList()
            alert(res.data.message1)
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:8000/users')
        .then(res=>{
            setUsns(res.data)
        })
    },[])
   
    return(

        <Container >
               <h2 className="text-center mt-4 mb-4">Collect Book</h2>
                <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                        
                        <Form className="border rounded border-secondary p-4">

                            <Form.Group as={Row} className="mb-3" controlId="f1">
                                <Form.Label column sm={4}>
                                USN
                                </Form.Label>
                                <Col sm={8}>
                                <Typeahead
                                    id="basic-typeahead-single"
                                    labelKey="usn"
                                    onChange={setSingleSelections}
                                    options={usns}
                                    placeholder="Choose USN"
                                    selected={singleSelections}
                                />
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3 mt-4">
                                <Col sm={{ span: 10, offset: 4 }}>
                                <Button type="submit" onClick={(e)=>{e.preventDefault(); booksList()}}>Find Books</Button>
                                </Col>
                            </Form.Group>

                        </Form>
                    </Col>
                </Row>
           

                <div>
                {isUpdating && books && <div>
                
                <h2 className="text-center mt-4 mb-4">Books issued to the User</h2>

                <Table striped bordered hover>
               
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Book Name</th>
                        <th>Issue date</th>
                        <th>Returned Date</th>
                        <th>Returned</th>
                        <th>Fine Amount</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                { books.map((val,key)=>{
                      return  <tr key={key}>
                        <td>{val._id}</td>
                        <td>{val.bookid}</td>
                        <td>{new Date(val.issuedate).toLocaleString("en-UK", {timeZone: "asia/kolkata"}) }</td>
                        <td>{ Boolean(val.submitdate) ? new Date(val.submitdate).toLocaleString("en-UK", {timeZone: "asia/kolkata"}) : null }</td>
                        <td>{String(val.received)}</td>
                        <td>{val.fineamount}</td>
                        <td><Button variant="danger" size="sm" disabled={val.received} onClick={()=>{collectBookHandler(val)}}>Collect Back</Button></td>
                    </tr>
                })
                }
                </tbody>

                </Table></div>
                }

                </div>
                
        </Container>

        
    )
}

export default CollectBook;