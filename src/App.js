import './style.css';
import HomePage from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AirportAvailability from './Pages/AirportAvailability';
import Layout from './component/Layout';
import Login from './Pages/Login';
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<Layout/>}>
   <Route path="/" index element={<HomePage/>}/>
   <Route path="/login" element={<Login/>}/>
   <Route path="/*" element={<HomePage/>}/>
   <Route path="results" element={<AirportAvailability/>}/>
   </Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
