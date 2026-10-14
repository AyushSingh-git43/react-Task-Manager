import { useState } from "react";

export function TaskForm({ onAddTask }) {
    const [task, setTask] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!task.trim()) return;
        onAddTask(task);
        setTask("");
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 mb-4">
            <input
                type="text"
                value={task}
                placeholder="Enter your task"
                onChange={(e) => setTask(e.target.value)}
                className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-violet-500"
            />
            <button 
                type="submit" 
                className="rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500 whitespace-nowrap"
            >
                + Add Task
            </button>
        </form>
    );
}