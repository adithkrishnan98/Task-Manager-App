import React, { useState } from "react";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import {TiTick} from 'react-icons/ti';
import axios from "axios";


const Createtask = () => {

    const [healthTag, setHealthTag] = useState(false);
    const [shoppingTag, setShoppingTag] = useState(false);
    const [personalTag, setPersonalTag] = useState(false);
    const [workTag, setWorkTag] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const status = "pending";
    const [deadline, setDeadline] = useState("");
    const[priority, setPriority] = useState(3);
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

        let tags = [];
        if(healthTag){
            tags.push("health");
        }
        if(shoppingTag){
            tags.push("shopping");
        }
        if(personalTag){
            tags.push("personal");
        }
        if(workTag){
            tags.push("work");
        }

        const tasks = {title, desc, status, formated_deadline, date_added, priority, tags};

        axios.post("https://fake-server-react-app.herokuapp.com/notes", tasks).then(() => history.go());
    }
    
    

    return ( 
        <div className="create-task-container">
            <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{opacity:0}}>Enter a new task below</motion.h3>
            <motion.div className="create-task" initial={{x:"100vw"}} animate={{x:0}} transition={{duration:1,ease: 'easeOut'}} exit={{x:'-100vw'}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-1">
                        <div className="title-box">
                            <label>Task Title</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="desc-box">
                            <label>Task description</label>
                            <textarea className="desc-area" required value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="tags-box">
                            <label>Task tags</label>
                            <div className="tags-holder">
                                <p onClick={() => !healthTag ? setHealthTag(true) : setHealthTag(false)} id="health-tag">Health {healthTag ? <TiTick/> : null} </p>
                                <p onClick={() => !shoppingTag ? setShoppingTag(true) : setShoppingTag(false)} id="shopping-tag">Shopping {shoppingTag ? <TiTick/> : null}</p>
                                <p onClick={() => !personalTag ? setPersonalTag(true) : setPersonalTag(false)} id="personal-tag">Personal {personalTag ? <TiTick/> : null}</p>
                                <p onClick={() => !workTag ? setWorkTag(true) : setWorkTag(false)} id="work-tag">Work {workTag ? <TiTick/> : null}</p>
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