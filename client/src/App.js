import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Addgame from './pages/Addgame';
import Allgames from './pages/Allgames';
import Admins from './pages/Admins';
import Login from './pages/Login';
import { AuthContext } from './context/context';
import { useState, useEffect } from 'react';



function App() {

  // const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('isAuth') === 'true') {
      return setIsAuth(true)
    }

  }, [isAuth])

  const re = new RegExp("ab+c");
  console.log(isAuth)

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<ErrorPage />} />
          <Route path='/login' element={<Login />} />
          {isAuth
            ? <>
              <Route path='/secret/addgame' element={<Addgame />} />
              <Route path='/secret/allgames' element={<Allgames />} />
              <Route path='/secret/admins' element={<Admins />} />
            </>
            : <Route path='/secret/*' element={<Login />} />
          }
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;