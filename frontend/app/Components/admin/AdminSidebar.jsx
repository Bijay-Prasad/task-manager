import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../State/User/Action";
import { FaTasks, FaUsers, FaBars, FaEllipsisV, FaSignOutAlt } from "react-icons/fa";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const navItems = [
    { label: "All Tasks", value: "tasks", icon: <FaTasks /> },
    { label: "All Users", value: "users", icon: <FaUsers /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center bg-purple-700 text-white px-4 py-3 shadow-md">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`md:w-64 w-full md:block bg-gradient-to-b from-purple-700 to-purple-900 text-white shadow-lg transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-6 flex flex-col justify-between h-[calc(100vh-64px)] md:h-screen">
          <div>
            <h2 className="hidden md:block text-2xl font-bold mb-8 tracking-wide border-b border-purple-400 pb-2">
              Admin Panel
            </h2>
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer transition-all duration-200 ${
                    activeTab === item.value
                      ? "bg-white text-purple-700 font-bold shadow-md"
                      : "hover:bg-purple-600"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Avatar + Dropdown */}
          <div className="border-t border-purple-500 pt-4 mt-6 relative" ref={dropdownRef}>
            <div className="flex items-center justify-between px-2">
              {/* Avatar + Info */}
              <div className="flex items-center gap-2 group">
                <div
                  className="w-9 h-9 bg-white text-purple-700 font-extrabold rounded-full flex items-center justify-center text-sm uppercase"
                  title={user?.name}
                >
                  {user?.name?.charAt(0) || "A"}
                </div>
                <div className="flex flex-col text-sm leading-tight">
                  <span className="font-medium" title={user?.name}>{user?.name}</span>
                  <span className="text-purple-200 text-xs">{user?.role}</span>
                </div>
              </div>

              {/* Dots */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white cursor-pointer hover:text-purple-300 transition"
              >
                <FaEllipsisV />
              </button>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute bottom-12 right-2 bg-white text-black rounded shadow-lg py-2 w-32 z-10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 cursor-pointer hover:bg-red-100 hover:text-red-600 text-sm"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
