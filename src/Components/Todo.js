import React, { useEffect, useState } from 'react'
import "./todo.css"

const getDataFromLS = () => {
    let todos = localStorage.getItem("todos");

    if (todos) {
        return JSON.parse(localStorage.getItem("todos"));
    }
    else {
        return [];
    }
}

function Todo() {
    const [inputdata, setinputdata] = useState('');
    const [tasks, settasks] = useState(getDataFromLS());
    const [toggleEdit, setToggleEdit] = useState(true);
    const [removeBtn, setRemoveBtn] = useState(true);
    const [editItem, setEditItem] = useState(null);

    const handleAddTask = () => {
        if (!inputdata) { }
        else if (inputdata && !toggleEdit) {
            settasks(
                tasks.map((elem) => {
                    if (elem.id === editItem) {
                        return { ...elem, name: inputdata }
                    }
                    return elem;
                }
                )
            )
            setToggleEdit(true);
            setinputdata('');
            setEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputdata }
            settasks([...tasks, allInputData]);
            setinputdata("");
        }
        if (tasks.length >= 1) {
            document.getElementById("removearea").style.display = "block";
        }

    }
    const todovalue = (event) => {
        const input = event.target.value;
        setinputdata(input);
    }
    const updateTask = (id) => {
        const getInputData = tasks.find((elem) => {
            return elem.id === id;
        });
        setToggleEdit(false);
        setinputdata(getInputData.name);
        setEditItem(id);
    }

    const deleteTask = (index) => {
        const remainingTask = tasks.filter((elem) => {
            return index !== elem.id;
        });
        if (tasks.length <= 2) {
            document.getElementById("removeBtn").innerText = "Remove";
        }
        if (tasks.length <= 1) {
            document.getElementById("removearea").style.display = "none";
        }
        settasks(remainingTask);
    }
    const handleRemoveAll = () => {
        setRemoveBtn(false);
        settasks([]);
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(tasks))
    }, [tasks])

    return (
        <>
            <div className='app'>
                <div className='main'>TODO Application</div>
                <div className='add-task'>
                    <div className='adding'>
                        <input type="text" name="" id="add" placeholder='Add your item' value={inputdata} onChange={todovalue} />
                        {
                            toggleEdit ? <button className='btn' onClick={handleAddTask} disabled={!inputdata}>Add Task</button>
                                : <button className='btn' onClick={handleAddTask}>Update Task</button>
                        }
                        <button className='btn' onClick={() => setinputdata("")} disabled={!inputdata} id='reset'>Reset</button>
                    </div>
                    {/* <div className='checklist'>
                        <button className='btn'>All</button>
                        <button className='btn'>Completed</button>
                        <button className='btn'>Uncompleted</button>
                    </div> */}
                </div>
            </div>
            {tasks.map((elem) => {
                return (
                    <div className='tasks' id='spectasks'>
                        <div className='tasklist'>
                            <div className='list' key={elem.id}>
                                <input type="text" id="task" value={elem.name} disabled={true} style={{ opacity: "0.8" }} />
                                <button className='btn' id="update" onClick={() => updateTask(elem.id)}>Edit</button>
                                <button className='btn' id='delete' onClick={() => deleteTask(elem.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className='removearea' id='removearea' style={{ display: "none" }}>
                <div className='rmbtn'>
                    {
                        removeBtn ? <button className='btn' id='removeBtn' onClick={handleRemoveAll} style={{ display: "block" }}>Remove All</button>
                            : <button className='btn' id='removeBtn' onClick={handleRemoveAll} style={{ display: "none" }} >Remove All</button>
                    }
                </div>
            </div>
        </>
    )
}

export default Todo;
