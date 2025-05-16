'use client';
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "../Components/admin/AdminSidebar";
import TaskTable from "../Components/admin/TaskTable";
import UserTable from "../Components/admin/UserTable";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    else if( user?.role !== "ADMIN"){
      router.push("/unauthorized");
    }
  }, [user]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {activeTab === "tasks" ? <TaskTable /> : <UserTable />}
      </div>
    </div>
  );
}
