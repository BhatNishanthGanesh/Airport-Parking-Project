import logo from './logo.svg';
import Homepage from './Pages/Homepage';
import './style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Login from './Pages/Login';
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Layout/>}>
   <Route path="/" index element={<Homepage/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/*" element={<Homepage/>}/>
   
   </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
