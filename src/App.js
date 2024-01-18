import { Route,Routes } from 'react-router-dom';

import './App.scss';

//contexts
import {AuthProvider} from './components/services/userManagement';
import { ApiManager } from './components/services/apiManager';
import { AppData } from './components/services/appData';

import Header from './components/header';
import Home from './components/home';
import MyBooks from './components/myBooks';
import History from './components/history';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Search from './components/search';
import Details from './components/details';


function App() {
  
  return (
    <div className='App'>
      <AuthProvider>
        <ApiManager>
          <AppData>
            <Header />
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='home' element={<Home/>} />
              <Route path='my-books' element={<MyBooks/>}/>
              <Route path='/history' element={<History/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/sign-in' element={<SignIn/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              <Route path='/details/:bookId' element={<Details/>}/>
            </Routes>
          </AppData>
        </ApiManager>
      </AuthProvider>
    </div>
  );
}

export default App;
