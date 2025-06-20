import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    // <div className="flex flex-col items-center justify-center h-full">
    //   <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
    //   <button
    //     onClick={() => navigate('/dashboard/today-task')}
    //     className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    //   >
    //     Get Started
    //   </button>
    // </div>


    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl font-bold mb-4">Stay Organized. Stay Ahead.</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Manage your tasks, sticky notes, and upcoming plans — all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/dashboard/today-task')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg">Get Started</button>
          <a href="#features" className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 text-lg">Explore Features</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="p-6 shadow-md rounded-xl text-center border">
            <div className="text-4xl text-blue-500 mb-4">✔️</div>
            <h3 className="text-xl font-semibold mb-2">Add Todos</h3>
            <p className="text-gray-600">Organize your daily and long-term tasks with ease.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl text-center border">
            <div className="text-4xl text-yellow-500 mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Sticky Notes</h3>
            <p className="text-gray-600">Quickly jot down ideas and reminders anywhere.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl text-center border">
            <div className="text-4xl text-green-500 mb-4">📆</div>
            <h3 className="text-xl font-semibold mb-2">Upcoming Tasks</h3>
            <p className="text-gray-600">See what’s next so you never miss a deadline.</p>
          </div>
          <div className="p-6 shadow-md rounded-xl text-center border">
            <div className="text-4xl text-purple-500 mb-4">☁️</div>
            <h3 className="text-xl font-semibold mb-2">Cloud Upload</h3>
            <p className="text-gray-600">Upload images & files securely using Cloudinary.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-100 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to become more organized?</h2>
        <p className="mb-6 text-gray-700">Create your free account today and boost your productivity.</p>
        <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        Made by Nitin Kr | <a href="https://github.com/your-github" className="underline hover:text-blue-600">GitHub</a>
      </footer>
    </div>
  );
}

export default Home;
