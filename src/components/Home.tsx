import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <section className="bg-white flex items-center justify-center px-4 py-16">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Markin</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A simple and powerful markdown editor built for clarity, speed, and productivity.
          Write notes, documents, and code — all in markdown.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/editor">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition outline-none">
              Get Started
            </button>
          </Link>
          <a
            href="https://github.com/adityaa-12/markin-app"
            target="_blank"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 outline-none"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
