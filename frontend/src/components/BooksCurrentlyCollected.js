import {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import { Table, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function BooksCurrenntlyCollected(){
    const usn= useParams();
    const [books, setBooks] = useState()

    useEffect(() => {
        const t1usn = usn.tusn;
        console.log(usn.tusn);
        axios.get(`http://localhost:8000/users/${t1usn}`)
        .then(res=>{
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

                for(var i in tbook){
                    if(!tbook[i].received){
                        delete tbook[i];
                    }
                }
                setBooks(tbook.reverse()) 
            }
            else{
                alert("Invalid USN")
            }
        })
    }, []);
    

    return(

        <div>
            <Container>
                
            {books && <div>
                <h2 className="text-center mt-4 mb-4">Books Collected from the User:  {usn.tusn}</h2>

                <Table striped bordered hover>
               
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Book ID</th>
                        <th>Issue date</th>
                        <th>Returned Date</th>
                        <th>Returned</th>
                        <th>Fine Amount</th>
                       
                    </tr>
                </thead>

                <tbody>
                { books.map((val,key)=>{
                      return  <tr key={key}>
                        <td>{val._id}</td>
                        <td>{val.bookid}</td>
                        <td>{new Date(val.issuedate).toLocaleString("en-UK", {timeZone: "asia/kolkata"}) }</td>
                        <td>{new Date(val.submitdate).toLocaleString("en-UK", {timeZone: "asia/kolkata"})}</td>
                        <td>{String(val.received)}</td>
                        <td>{val.fineamount}</td>
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

export default BooksCurrenntlyCollected;