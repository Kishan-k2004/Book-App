import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
    image: ''
  });

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

  const handleSelect = (id) => {
    const selected = books.find(book => book._id === id);
    if (selected) {
      setSelectedBookId(id);
      setFormData({
        title: selected.title,
        author: selected.author,
        date: selected.date,
        image: selected.image
      });
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://book-app-31ms.onrender.com/books/${selectedBookId}`, formData);
      alert('Book updated successfully');
      fetchBooks();
      setSelectedBookId('');
    } catch (error) {
      console.error(error);
      alert('Error updating book');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">✏️ Update Book</h2>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Select a book to edit:</h4>
        <ul className="grid gap-2 sm:grid-cols-2">
          {books.map(book => (
            <li
              key={book._id}
              className="bg-gray-100 p-3 rounded-md flex justify-between items-center shadow-sm hover:bg-gray-200"
            >
              <div>
                <strong>{book.title}</strong> <span className="text-sm text-gray-600">by {book.author}</span>
              </div>
              <button
                onClick={() => handleSelect(book._id)}
                className="px-4 py-1 bg-yellow-400 text-sm text-black font-medium rounded hover:bg-yellow-500"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedBookId && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              required
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="block w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Update Book
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
