import { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { TaskControls } from "./TaskControls";

export function AddTask() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    
    const [completedIndexes, setCompletedIndexes] = useState(() => {
        const savedCompleted = localStorage.getItem("completedIndexes");
        return savedCompleted ? JSON.parse(savedCompleted) : [];
    });

    const [editIndex, setEditIndex] = useState(null);
    const [editTask, setEditTask] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [filterTab, setFilterTab] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("completedIndexes", JSON.stringify(completedIndexes));
    }, [completedIndexes]);

    function handleAddTask(newTask) {
        setTasks([...tasks, newTask]);
    }

    function handleDelete(indexToDelete) {
        setTasks(tasks.filter((_, index) => index !== indexToDelete));
        if (editIndex === indexToDelete) {
            setEditIndex(null);
        }
        setCompletedIndexes(
            completedIndexes
                .filter(i => i !== indexToDelete)
                .map(i => (i > indexToDelete ? i - 1 : i))
        );
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

    const filteredTasks = tasks.map((item, index) => ({ item, index })).filter(({ item, index }) => {
        const matchesSearch = item.toLowerCase().includes(searchQuery.toLowerCase());
        const isCompleted = completedIndexes.includes(index);

        if (filterTab === "pending") return matchesSearch && !isCompleted;
        if (filterTab === "completed") return matchesSearch && isCompleted;
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-950 p-6 text-white">
            <div className="mx-auto max-w-xl">
                <h1 className="mb-2 text-3xl font-bold">MY Task Manager</h1>
                <p className="mb-6 text-slate-400">
                    Organise your day, one task at a time
                </p>

                <TaskForm onAddTask={handleAddTask} />

                <TaskControls 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterTab={filterTab}
                    setFilterTab={setFilterTab}
                />

                <div className="space-y-4">
                    {filteredTasks.length === 0 ? (
                        <p className="text-sm text-slate-500 text-center py-6">No Tasks Found</p>
                    ) : (
                        filteredTasks.map(({ item, index }) => (
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
                                        <span className={`flex-1 transition-colors ${completedIndexes.includes(index) ? 'line-through text-slate-500' : 'text-slate-200'}`}>
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