import { Route,Routes } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Header from './components/header';
import Home from './components/home';
import MyBooks from './components/myBooks';
import History from './components/history';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

function App() {
  const menus = [[{text:"home",link:"/"},{text:"MyBooks",link:"my-books"},{text:"History",link:"history"}],[{text:"search",link:"search"},{text:"sign in",link:"sign-in"},{text:"sign up",link:"sign-up"}]];
  
  return (
    <div className='App'>
       <Header menus={menus}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='home' element={<Home/>} />
        <Route path='my-books' element={<MyBooks/>}/>
        <Route path='/history' element={<History/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
