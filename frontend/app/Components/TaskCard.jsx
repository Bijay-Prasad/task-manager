export default function TaskCard({ task }) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="text-xs mt-2 text-blue-500">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
        </div>
    );
}
