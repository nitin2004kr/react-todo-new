import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Sidebar from './components/sidebar/Sidebar';
import Foreground from './components/foreground/Foreground';
import Login from "./components/auth/Login";
import Home from "./components/HomePage/Home";

function App() {
  const location = useLocation();

  // Define paths where you want to show the dashboard layout
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className='w-full h-screen bg bg-zinc-100 flex'>
      {isDashboard && (
        <div className='h-full lg:w-1/5 md:w-1/4 w-37 py-5 px-2'>
          <Sidebar />
        </div>
      )}

      <div className={`h-full ${isDashboard ? 'flex-grow py-5 px-2' : 'w-full'}`}>
        <Routes>
          {/* Public or auth routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Dashboard routes handled by Foreground */}
          <Route path="/dashboard/*" element={<Foreground />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
