import Home from './pages/Home';
import './style.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AirportAvailability from './pages/AirportAvailability';
import Layout from './components/Layout';
import Login from './pages/Login';
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
