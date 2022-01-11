import View from "./components/View";
import Navbar from "./components/Navbar";
import TaskCreation from "./components/TaskCreation";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Footer from "./components/Footer";


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      
        <Routes>
          
          <Route path='/' element={<View />} />
          <Route path='/createTask' element={<TaskCreation />}  />
          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
