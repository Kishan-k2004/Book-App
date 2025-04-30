import React, { useState } from 'react';
import axios from 'axios';

const SearchBook = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    if (!query) {
      alert('Please enter a title to search');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:9000/search?title=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error while fetching books');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">🔍 Search Books</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="bg-gray-100 p-4 rounded-lg shadow-md text-center">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-700"><strong>Author:</strong> {book.author}</p>
              <p className="text-sm text-gray-700"><strong>Date:</strong> {book.date}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
