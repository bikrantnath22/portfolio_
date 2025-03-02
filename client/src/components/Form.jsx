import React, { useState, useEffect } from "react";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

export default function Form() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", email: "" });
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost/PortfolioPHP/api.php");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    
    const response = await fetch("http://localhost/PortfolioPHP/api.php", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    setMessage(result.success || result.error);

    if (result.success) {
      fetchUsers();
      setFormData({ id: null, name: "", email: "" });
      setEditing(false);
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost/PortfolioPHP/api.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), // Send ID in the body
    });
  
    const result = await response.json();
    setMessage(result.success || result.error);
  
    if (result.success) fetchUsers(); // Refresh user list
  };

  return (
    <div className="flex flex-col sm:flex-row  justify-center space-x-10 mt-8">
      <div>
        <h2 className="font-bold text-xl">User List</h2>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50 text-gray-700">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 flex justify-center space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEdit(user)}
                    >
                      <EditFilled />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      
                                          >
                      <DeleteFilled onClick={() => handleDelete(user.id)}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="font-bold text-xl">{editing ? "Edit User" : "Add User"}</h2>
        <form
          className="flex flex-col bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {editing ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}
