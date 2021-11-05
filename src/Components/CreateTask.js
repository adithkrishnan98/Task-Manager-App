import React, { useState } from "react";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import {TiTick} from 'react-icons/ti';
import axios from "axios";

const Createtask = (props) => {

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
    const date_added = ("0" + present_date.getDate()).slice(-2) + "-"
                        + (present_date.toDateString().slice(4,7))  + "-" 
                        + present_date.getFullYear()  
    console.log(date_added);
    const history = useHistory();

    const darkMode = props.darkmode;

    const handleSubmit = (e) => {
        e.preventDefault(); // prevents refresh of page when clicking on submit button

        const dline = new Date(deadline);
        const formated_deadline = ("0" + dline.getDate()).slice(-2) + '-' + (dline.toDateString().slice(4,7)) + '-' +  dline.getFullYear();

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

        axios.post(props.url+"/", tasks).then(() => history.push("/"));
    }
    
    

    return ( 
        <div className="create-task-container">
            <motion.h3 style={{color : !darkMode ? "black" : "white"}} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity:0}}>Enter a new task below</motion.h3>
            <motion.div className="create-task" initial={{x:"100vw"}} animate={{x:0}} transition={{duration:0.5,ease: 'easeOut'}} exit={{x:'-100vw'}}>
                <form onSubmit={handleSubmit}>
                    <div className="form-1" style={{borderColor : !darkMode ? "black" : "white", background : !darkMode ? "white" : "#004C74", color : !darkMode ? "black" : "white", boxShadow : !darkMode ? "6px 6px 2px #dba120" : "3px 3px 2px lightgrey"}}>
                        <div className="title-box">
                            <label>Task title</label>
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
                    <div className="form-2" style={{borderColor : !darkMode ? "black" : "white", background : !darkMode ? "white" : "#004C74", color : !darkMode ? "black" : "white", boxShadow : !darkMode ? "6px 6px 2px #dba120" : "3px 3px 2px lightgrey"}}>
                        <div className="date-info">
                            <label>Task deadline</label>
                            <input type="date" min={new Date().getFullYear() + "-" + (new Date().getMonth()+1 < 10 ? "0" : "") + (new Date().getMonth()+1) + "-" + (new Date().getDate() < 10 ? "0" : "") + new Date().getDate()} required value={deadline} onChange={(e) => setDeadline(e.target.value)}/>
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
                    <button style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white", boxShadow : !darkMode ? "4px 4px 2px 0 rgb(213, 147, 49)" : null }}>ADD</button>
                </form>
        </motion.div>
        </div>
    );
}
 
export default Createtask;