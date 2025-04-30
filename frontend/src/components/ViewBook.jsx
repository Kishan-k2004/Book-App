import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    handleView();
  }, []);

  const handleView = async () => {
    try {
      const res = await axios.get('https://book-app-jigo.onrender.com/books');
      setBooks(res.data);
    } catch (err) {
      console.log(err);
      alert('Failed to fetch books');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-md shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">📚 View Book Details</h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books.map((book) => (
          <div
            className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition duration-300"
            key={book._id}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-700"><strong>Author:</strong> {book.author}</p>
              <p className="text-sm text-gray-700"><strong>Date:</strong> {book.date}</p>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No books found 📭</p>
      )}
    </div>
  );
};

export default ViewBook;
