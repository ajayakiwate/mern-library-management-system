import NavBar from './components/NavBar';
import AddBook from './components/AddBook';
import BooksList from './components/BooksList';
import CreateUser from './components/CreateUser';
import UsersList from './components/UsersList';
import IssueBook from './components/IssueBook';
import AvailableBooks from './components/AvailableBooks';
import CollectBook from './components/CollectBook';
import Login from './components/Login';
import AdminList from './components/AdminList';
import UserList from './components/UserList';
import Logout from './components/Logout'
import BooksIssued from './components/BooksIssued';
import ChangePassword from './components/ChangePassword';

import BooksCurrenntlyIssued from './components/BooksCurrentlyIssued';
import BooksCurrenntlyCollected from './components/BooksCurrentlyCollected';

import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Test1 from './components/Test1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div><NavBar/><AvailableBooks/></div>} />
        <Route path="/logout" element={<div><Logout/></div>} />
        <Route path="/home" element={<div><AdminList/><AvailableBooks/></div>} />
        <Route path="/homePage" element={<div><UserList/><AvailableBooks/></div>} />
        <Route path="/booksIssued" element={<div><UserList/><BooksIssued/></div>} />
        <Route path="/login" element={<div><NavBar/><Login/></div>} />
        <Route path="/changeUserPassword" element={<div><UserList/><ChangePassword/></div>} />
        <Route path="/changeAdminPassword" element={<div><AdminList/><ChangePassword/></div>} />
        <Route path="/addBook" element={<div><AdminList/><AddBook/></div>} />
        <Route path="/booksList" element={<div><AdminList/><BooksList/></div>} />
        <Route path="/createUser" element={<div><AdminList/><CreateUser/></div>} />
        <Route path="/usersList" element={<div><AdminList/><UsersList/></div>} />
        <Route path="/issueBook" element={<div><AdminList/><IssueBook/></div>} />
        <Route path="/collectBook" element={<div><AdminList/><CollectBook/></div>} />
    
        <Route path="/booksCurrenntlyIssued/:tusn" element={<div><AdminList/><BooksCurrenntlyIssued/></div>} />
        <Route path="/booksCurrenntlyCollected/:tusn" element={<div><AdminList/><BooksCurrenntlyCollected/></div>} />

        <Route path="/test1" element={<div><Test1/></div>} />

        <Route path='*' element={<Login/>} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
