import { useState } from "react";

export function AddTask() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    
    // States to handle editing
    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    // State to handle completed/done tasks
    const [completedIndexes, setCompletedIndexes] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        if (!task.trim()) return;

        setTasks([...tasks, task]);
        setTask("");
    }

    function handleDelete(indexToDelete) {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
        if (editIndex === indexToDelete) {
            setEditIndex(null);
        }
        // Also remove it from completed indexes if it was completed
        setCompletedIndexes(completedIndexes.filter(i => i !== indexToDelete));
    }

    function handleStartEdit(index) {
        setEditIndex(index);
        setEditTask(tasks[index]);
    }

    function handleSaveEdit(indexToSave) {
        if (!editTask.trim()) return;

        const updatedTasks = tasks.map((item, index) =>
            index === indexToSave ? editTask : item
        );
        setTasks(updatedTasks);
        setEditIndex(null);
        setEditTask("");
    }

    function handleCancelEdit() {
        setEditIndex(null);
        setEditTask("");
    }

    function handleToggleDone(index) {
        if (completedIndexes.includes(index)) {
            setCompletedIndexes(completedIndexes.filter(i => i !== index));
        } else {
            setCompletedIndexes([...completedIndexes, index]);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white">
            <div className="mx-auto max-w-xl">
                <h1 className="mb-2 text-3xl font-bold">MY Task Manager</h1>
                <p className="mb-6 text-slate-400">
                    Organise your day, one task at a time
                </p>

                <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
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

                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-6">No Task Yet</p>
                    ) : (
                        tasks.map((item, index) => (
                            <div 
                                key={index}
                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 gap-3"
                            >
                                {editIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editTask}
                                            onChange={(e) => setEditTask(e.target.value)}
                                            className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 outline-none focus:border-violet-500 text-slate-200"
                                        />
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleSaveEdit(index)}
                                                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium hover:bg-emerald-500"
                                            >
                                                Save
                                            </button>
                                            <button 
                                                onClick={handleCancelEdit}
                                                className="rounded-lg bg-slate-700 px-3 py-1.5 text-sm font-medium hover:bg-slate-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className={`flex-1 transition-colors ${completedIndexes.includes(index) ? 'line-through text-slate-500' : 'text-slate-250'}`}>
                                            {item}
                                        </span>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => handleToggleDone(index)}
                                                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${completedIndexes.includes(index) ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                                            >
                                                {completedIndexes.includes(index) ? 'Undo' : 'Done'}
                                            </button>
                                            <button 
                                                onClick={() => handleStartEdit(index)}
                                                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium hover:bg-blue-400"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(index)}
                                                className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium hover:bg-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}