import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Signup from "./components/Signup"
import Login from './components/Login';
import Success from './components/Success';

const App = () => {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">

      <Routes location={location} key={location.key}>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
      
      
      </Routes>
        </AnimatePresence>
    </BrowserRouter>
  )
}

export default App