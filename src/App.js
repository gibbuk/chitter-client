import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AllPeeps from './components/AllPeeps/AllPeeps';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import SignInForm from './components/SignInForm/SignInForm';
import Loading from './components/Loading/Loading';
import PeepForm from './components/PeepForm/PeepForm';
import Error from './components/Error/Error';
import SignUpForm from './components/SignUpForm/SignUpForm';

function App() {

  const [peeps, setPeeps] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});


  const getPeeps = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/peeps`);
      setPeeps(response.data);
    }
    catch (error) {
      setError(error);
    };
  };

  const signOut = () => setUser({});

  useEffect(() => {
    getPeeps();

  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="container">
          <div className="row">
            <Routes>
              <Route path="/" element={
                <>
                  {(!peeps && !error) && <Loading />}
                  {(!peeps && error) && <Error message={error.message} />}
                  {peeps && < AllPeeps peeps={peeps} />}
                  {!user.username ? <SignInForm setLoginUser={setUser} /> : <PeepForm user={user} getPeeps={getPeeps} signOut={signOut} />}
                </>
              } />
              <Route path="/signup" element={<SignUpForm />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
