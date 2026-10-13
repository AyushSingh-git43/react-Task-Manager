import { useState } from "react"

export function Practic(){
    const [task ,setTask] = useState("");
    const [tasks,setTasks] = useState([]);
    const [editIndex,setEditIndex] = useState(null);
    const [editTask,setEditTask] = useState("")

    function handleAddTask(e){
        e.preventDefault();
        if(!task.trim())return;

        setTasks([...tasks,task]);
        setTask("")

    };
    function handleDelete(indexToDelete){
        const update =tasks.filter((_,index) =>index !==indexToDelete)
        setTasks(update)

    }
    function StartEdit(index){
        setEditIndex(index);
        setEditTask(tasks[index])
    }
    function Save(indexToSave){

        if(!editTask.trim())return;
        const updateTask= tasks.map((item,index) => index === indexToSave  ? editTask:item
        );
        setTasks(updateTask);
        setEditIndex(null)
        setEditTask("")
    }
    function Cancle(){
        setEditTask("")
        setEditIndex(null)
    }


    

    return(
        <div>
            <h1>Task Manager</h1>
            <input 
            type="text"
            value={task}
            placeholder="enter Task"
            onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <div>
                {tasks.map((item,index) => (
                    <p key={index}>{editIndex == index ? (
                        <>
                        <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                            />

                            <div className="flax gap-2">
                                <button onClick={() => Save(index)}>Save</button>
                                <button onClick={Cancle}>Cancle</button>

                            </div>

                        </>
                    ):(
                        <>
                        <sapn>{item}</sapn>
                        <div>
                            <button onClick={() => StartEdit(index)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                        </>
                        
                        
                    )}
                    
                    </p>
                ))}
            </div>
            
        </div>
    )
}