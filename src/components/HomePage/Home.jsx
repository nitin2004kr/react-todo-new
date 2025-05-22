import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
      <button
        onClick={() => navigate('/dashboard/today-task')}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
}

export default Home;
