import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/notes' element={<Notes />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
