import {useState, useEffect} from 'react'
import axios from 'axios'

import { Table, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function AvailableBooks(){
    const [allBooks, setAllBooks] = useState()


    useEffect(()=>{
        axios.get("http://localhost:8000/books/")
        .then(res=>{
            setAllBooks(res.data);
        })
    },[]);

    return(
        <div>
            <Container>
            <h2 className="text-center mt-4 mb-4">Welcome to the Library</h2>

                {allBooks && <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Book Name</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Total Books</th>
                            <th>Available Books</th>
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
                        <td>{val.stock}</td>
                    </tr>
                    })
                }
                    
                </tbody>
                </Table>}
            </Container>  
                    
        </div>
    )
}

export default AvailableBooks;