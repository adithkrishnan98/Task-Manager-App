import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";  /* useSelector hook is used to access values of state */
import { useDispatch } from "react-redux";  /* useDispatch hook is used to modify values of state */
import { setTasks } from "../features/tasks_info";


const Taskdetails = (props) => {
    // allows us to grab route parameters from the url
    const {id} = useParams();
    const history = useHistory();

    const [editState, setEditState] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [due_date, setDueDate] = useState("");
    
    const global_tasks = useSelector((state) => state.tasks.value);
    const darkMode = props.darkmode;
    const dispatch = useDispatch();

    useEffect(() => {
      axios.get(props.url+"/"+id).then(json => dispatch(setTasks(json.data)));
    }, [props.url,dispatch, id]);

    

    const handleEdit = (id) => {
      editState ? setEditState(false) : setEditState(true)
      setTitle(global_tasks.title);
      setDesc(global_tasks.desc);
      setDueDate(global_tasks.formated_deadline);
    }


    const handleFormSubmit = (e) => {
      e.preventDefault();

      let tags = [];
        if(global_tasks.tags.includes("health")){
            tags.push("health");
        }
        if(global_tasks.tags.includes("shopping")){
            tags.push("shopping");
        }
        if(global_tasks.tags.includes("personal")){
            tags.push("personal");
        }
        if(global_tasks.tags.includes("work")){
            tags.push("work");
        }

      axios.put(props.url+"/"+id, 
            {title : title, 
              status : "pending", 
              desc : desc, 
              formated_deadline : due_date, 
              date_added : global_tasks.date_added, 
              priority : global_tasks.priority, 
              id : global_tasks.id, 
              tags: tags}).then(() => history.push("/"))
    }

    return ( 
        <motion.div className="task-details" style={{borderColor : !darkMode ? "black" : "white", background : !darkMode ? "whitesmoke" : "#004C74", color : !darkMode ? "black" : "white", boxShadow : !darkMode ? "3px 6px 6px grey" : "2px 4px 6px white"}} initial={{y:"100vh"}} animate={{y:0}} transition={{duration : 0.5}} exit={{x:"-100vw"}}>
            {global_tasks && editState ? (
              <div className="edit-task-details">
                <form>
                  <div className="title-holder">
                    <label>Edit title</label>
                    <input type="text" className="title-edit-text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="desc-holder">
                    <label>Edit description</label>
                    <input type="text" className="desc-edit-text" required value={desc} onChange={(e) => setDesc(e.target.value)}/>
                  </div>
                  <div className="date-holder">
                    <label>Edit deadline</label>
                    <input type="text" className="date-edit-text" required value={due_date} onChange={(e) => setDueDate(e.target.value)}/>
                  </div>
                  <div className="btn-holder">
                    <button className="backBtn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white"}} onClick={(e) => {e.preventDefault(); history.push("/:id")}}>Back</button>
                    <button className="submitBtn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white"}} onClick={handleFormSubmit}>Submit</button>
                  </div>
                </form>
              </div>
            ) : global_tasks && !editState ? (
              <div className="tasklist-details">
                <h2 style={{color : !darkMode ? "black" : "white"}}>{global_tasks.title}</h2>
                <p style={{color : !darkMode ? "black" : "white"}}><b>Description :</b> {global_tasks.desc}</p>
                <p style={{color : !darkMode ? "black" : "white"}}><b>Date added :</b> {global_tasks.date_added}</p>
                <p style={{color : !darkMode ? "black" : "white"}}><b>Due date : </b> {global_tasks.formated_deadline}</p>
                <button className="editBtn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white"}} onClick={() => {handleEdit(global_tasks.id)}}>Edit</button>
              </div>
            ) : <div>Loading...</div>}
        </motion.div>
     );
}
 
export default Taskdetails;