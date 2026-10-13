import { useState } from "react";

export function AddTask(){
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function handleSubmit(e){
        e.preventDefault();
        if(!task.trim()) return;

        setTasks([...tasks, task]);
        setTask("");
    }

    function handleDelete(indexToDelete){
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
    }

    return(
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
                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4"
                            >
                                <span className="text-slate-200">{item}</span>
                                <button 
                                    onClick={() => handleDelete(index)}
                                    className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium hover:bg-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}