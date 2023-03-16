import './style.css';
import HomePage from './Page/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import AirportAvailability from './Page/AirportAvailability';
import Layout from './components/Layout';
import Login from './Page/Login';
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
