
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

import Chatbox from './Chatbox';
import './App.css';

// will use react-router-dom to switch to admin dashboard but this won't be needed for plugin development
function App() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Welcome</h1>
         <button onClick={() => navigate('/admin')}> Click to switch to admin dashboard</button>
      <Chatbox />
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
};
