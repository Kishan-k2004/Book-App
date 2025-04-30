import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddBook from './components/AddBook';
import ViewBook from './components/ViewBook';
import SearchBook from './components/SearchBook';
import UpdateBook from './components/UpdateBook';
import DeleteBook from './components/DeleteBook';
import './App.css'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <nav className="bg-blue-600 p-4 shadow-md">
          <ul className="flex gap-4 justify-center text-white font-semibold">
            <li>
              <Link to="/add" className="hover:text-yellow-300 transition">Add Book</Link>
            </li>
            <li>
              <Link to="/view" className="hover:text-yellow-300 transition">View Book</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-yellow-300 transition">Search Book</Link>
            </li>
            <li>
              <Link to="/update" className="hover:text-yellow-300 transition">Update Book</Link>
            </li>
            <li>
              <Link to="/delete" className="hover:text-yellow-300 transition">Delete Book</Link>
            </li>
          </ul>
        </nav>

        <main className="p-6">
          <Routes>
            <Route path="/add" element={<AddBook />} />
            <Route path="/view" element={<ViewBook />} />
            <Route path="/search" element={<SearchBook />} />
            <Route path="/update" element={<UpdateBook />} />
            <Route path="/delete" element={<DeleteBook />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
