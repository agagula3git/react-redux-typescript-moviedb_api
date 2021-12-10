import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import HomePage from './components/HomePage'
import ViewOne from './components/ViewOne'

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element={<HomePage/>}/>
          <Route path = "/show-one" element={<ViewOne/>}/>
        </Routes>
      </Router>
    </div>
  );
}

