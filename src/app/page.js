'use client';

import { useState, useEffect } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('users');
    // if (storedData) {
    //   setData(JSON.parse(storedData));
    // } 
    // else {
    //   setData([
    //     // { id: 1, name: 'John Doe', email: 'john@example.com' },
    //     // { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    //   ]);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(data));
  }, [data]);

  const handleView = (item) => {
    setSelectedItem(item);
    setModalType('view');
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedData = data.map(item =>
      item.id === selectedItem.id ? selectedItem : item
    );
    setData(updatedData);
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...selectedItem,
      id: Date.now(), 
    };
    setData([...data, newItem]);
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setSelectedItem({ name: '', email: '' });
    setModalType('add');
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen p-10 bg-gray-300 flex-col">
      <div className="font-bold text-center text-4xl text-red-600 mb-6">NEXT JS CRUD</div>

      <button
        onClick={handleAdd}
        className="mb-4 w-32 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
      >
        Add data
      </button>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleView(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            {modalType === 'view' && (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>
                <p><strong>Name:</strong> {selectedItem.name}</p>
                <p><strong>Email:</strong> {selectedItem.email}</p>
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>
                </div>
              </>
            )}

            {(modalType === 'edit' || modalType === 'add') && (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">
                  {modalType === 'edit' ? 'Edit User' : 'Add User'}
                </h2>
                <form
                  onSubmit={modalType === 'edit' ? handleEditSubmit : handleAddSubmit}
                  className="flex flex-col gap-4"
                >
                  <input
                    type="text"
                    name="name"
                    value={selectedItem.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border p-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={selectedItem.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="border p-2 rounded"
                    required
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
