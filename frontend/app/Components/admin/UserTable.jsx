import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole } from "../../State/User/Action";
import { toast } from "react-toastify";

const USERS_PER_PAGE = 6;

export default function UserTable() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleRoleChange = async (id, role) => {
    try {
      console.log("id:", id, "role:", role);
      
      await dispatch(updateUserRole(id, role));
      toast.success("Role updated!");
      dispatch(getAllUsers());
    } catch {
      toast.error("Role update failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log("id:", id);
      
      await dispatch(deleteUser(id));
      toast.success("User deleted!");
      dispatch(getAllUsers());
    } catch {
      toast.error("Delete failed!");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-700 text-white text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-semibold uppercase">Name</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Email</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Role</th>
              <th className="px-6 py-3 text-left font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {paginatedUsers.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="bg-gray-100 text-sm rounded px-2 py-1 border border-gray-300 shadow-sm"
                  >
                    <option value="USER">USER</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-sm rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500 text-sm">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`px-3 py-1 rounded ${currentPage === idx + 1
                ? "bg-purple-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
