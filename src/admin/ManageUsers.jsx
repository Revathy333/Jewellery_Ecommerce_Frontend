import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { confirmAlert } from 'react-confirm-alert';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("admin/users/");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user) => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete ${user.username || "this user"}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await api.delete(`admin/users/${user.id}/`);
              setUsers((prev) => prev.filter((u) => u.id !== user.id));
              toast.success(`${user.username || "User"} has been deleted`);
            } catch (error) {
              toast.error("Failed to delete user");
              console.error("Error deleting user:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const toggleActive = async (user) => {
    try {
      await api.put(`admin/users/${user.id}/`, {
        is_active: !user.is_active,
      });
      
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, is_active: !u.is_active } : u
        )
      );
      
      toast.info(
        `${user.username || "User"} is now ${
          !user.is_active ? "active" : "inactive"
        }`
      );
    } catch (error) {
      toast.error("Failed to update user status");
      console.error("Error updating user:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 py-8">Loading users...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h1>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-gray-700 font-semibold">ID</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Username</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Email</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Status</th>
              <th className="px-4 py-3 text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user.id}
                className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-3 text-gray-700">{user.id}</td>
                <td className="px-4 py-3 text-gray-700">{user.username}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleActive(user)}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${
                      user.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => setViewUser(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center text-gray-600 py-4">No users found.</p>
        )}
      </div>

      {viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <p>
              <strong>ID:</strong> {viewUser.id}
            </p>
            <p>
              <strong>Username:</strong> {viewUser.username}
            </p>
            <p>
              <strong>Email:</strong> {viewUser.email}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {viewUser.is_active ? "Active" : "Inactive"}
            </p>
            <button
              onClick={() => setViewUser(null)}
              className="mt-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
