import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:9000/books');
      setBooks(res.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching books');
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://book-app-31ms.onrender.com/books/${id}`);
      alert('Book deleted successfully');
      fetchBooks(); // Refresh the list
    } catch (error) {
      console.error(error);
      alert('Error deleting book');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">Delete Books</h2>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">No books available</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-sm border"
            >
              <div>
                <p className="font-semibold text-lg text-gray-800">{book.title}</p>
                <p className="text-sm text-gray-600">by {book.author}</p>
              </div>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DeleteBook;
