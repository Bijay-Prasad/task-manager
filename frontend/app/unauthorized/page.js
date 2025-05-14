export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-50">
      <h1 className="text-2xl font-bold text-red-600">Access Denied: Admins Only</h1>
    </div>
  );
}
