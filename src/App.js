// import logo from './logo.svg';
import Home from './Pages/Home';
import './style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AirportAvailability from './Pages/AirportAvailability';
import Layout from './components/Layout';
import Login from './Pages/Login';
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Layout/>}>
   <Route path="/" index element={<Home/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/*" element={<Home/>}/>
   <Route path="results" element={<AirportAvailability/>}/>
   </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
