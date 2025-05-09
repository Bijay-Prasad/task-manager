import { useDispatch } from "react-redux";
import { logout } from "../State/User/Action";


export default function Navbar() {
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between p-4 shadow-md bg-white">
            <h1 className="text-xl font-bold text-purple-700">Task Manager</h1>
            <button onClick={() => dispatch(logout())} className="text-sm px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md">
                Logout
            </button>
        </div>
    );
}
