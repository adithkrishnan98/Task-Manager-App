import React, { useState } from "react";
import { useHistory } from "react-router";
import { motion } from "framer-motion";

const Createtask = () => {

    const [health, setHealth] = useState(false);
    const [shopping, setShopping] = useState(false);
    const [personal, setPersonal] = useState(false);
    const [work, setWork] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const status = "pending";
    const [deadline, setDeadline] = useState("");
    const[priority, setPriority] = useState(3);
    const [tags, setTags] = useState([]);
    const present_date = new Date();
    const date_added = ("0" + present_date.getDate()).slice(-2) + "/"
                        + (present_date.getMonth()+1)  + "/" 
                        + present_date.getFullYear()  
                        // + present_date.getHours() + ":"  
                        // + present_date.getMinutes() + ":" 
                        // + present_date.getSeconds();

    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault(); // prevents refresh of page when clicking on submit button
        
        const dline = new Date(deadline);
        const formated_deadline = ("0" + dline.getDate()).slice(-2) + '/' + ("0" + (dline.getMonth() + 1)).slice(-2) + '/' +  dline.getFullYear();

        const tasks = {title, desc, status, formated_deadline, date_added, priority};

        fetch("http://localhost:8001/notes", {
            method: "POST",
            headers : { "Content-Type": "application/json"},
            body : JSON.stringify(tasks)
        }).then(() => {
            history.push("/");
        })
    }

    return ( 
        <div className="create-task-container">
            <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}}>Enter a new task below</motion.h3>
            <motion.div className="create-task" initial={{x:"100vw"}} animate={{x:0}} transition={{duration:1}} exit={{x:'-100vw',transition:{ ease: 'easeOut'}}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-1">
                        <div className="title-box">
                            <label>Task Title</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="desc-box">
                            <label>Task description</label>
                            <textarea className="desc-area" cols="50" rows="7" required value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="tags-box">
                            <label>Task tags</label>
                            <div className="tags-holder">
                                <p onClick={() => !health ? setHealth(true) && setTags([...tags, health ? "health" : null]) : setHealth(false)} id="health-tag">Health</p>
                                <p onClick={() => !shopping ? setShopping(true) : setShopping(false)} id="shopping-tag">Shopping</p>
                                <p onClick={() => !personal ? setPersonal(true) : setPersonal(false)} id="personal-tag">Personal</p>
                                <p onClick={() => !work ? setWork(true) : setWork(false)} id="work-tag">Work</p>
                            </div>
                        </div>
                        
                    </div>
                    <div className="form-2">
                        <div className="date-info">
                            <label>Task Deadline</label>
                            <input type="date" required value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
                        </div>
                        <div className="priority-box">
                            <label>Task priority</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="1">High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                            </select>
                        </div>
                    </div>
                    <button>ADD</button>
                </form>
        </motion.div>
        </div>
     );
}
 
export default Createtask;