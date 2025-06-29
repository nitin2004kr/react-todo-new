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
        {!isDashboard && (
          <div className="w-ful border-b-2 border-[#3F7FAF]  bg-blue-100 flex justify-between items-center py-3 px-15 ">
            <div className="w-[80px] ">
              <img src="/assets/images/logo.png" />
            </div>


            <ul className="flex justify-center items-center gap-10 px-40">
              <li className="text-2xl font-bold " style={{ color: '#3F7FAF' }}><a href='/'>Home</a></li>
              <li className="text-2xl font-bold " style={{ color: '#3F7FAF' }}><a href='/dashboard/today-task'>All Tasks</a></li>
              <li className="text-2xl font-bold " style={{ color: '#3F7FAF' }}>Pricing</li>
              <li className="text-2xl font-bold " style={{ color: '#3F7FAF' }}><a href="/login">Login</a></li>
            </ul>

          </div>
        )}

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
