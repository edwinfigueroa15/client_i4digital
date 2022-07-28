import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './app/shared/Navbar';
import Footer from './app/shared/Footer';

import NotFoundPage from './app/pages/error/NotFoundPage';
import User from './app/pages/user/User';
import Illness from './app/pages/illness/Illness';

const App = () => {
  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 72px)' }}>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<User/>} ></Route>
                <Route path="/illness/:id" element={<Illness/>} ></Route>
                <Route path="*" element={<NotFoundPage />}></Route> 
            </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </>
  );
}

export default App;
