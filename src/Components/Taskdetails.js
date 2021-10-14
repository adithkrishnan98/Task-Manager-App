import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import { useSelector } from "react-redux";  /* useSelector hook is used to access values of state */
import { useDispatch } from "react-redux";  /* useDispatch hook is used to modify values of state */
import { setTasks } from "../features/tasks_info";


const Taskdetails = () => {
    // allows us to grab route parameters from the url
    const {id} = useParams();
    const history = useHistory();
    const url = "https://fake-server-react-app.herokuapp.com/notes/" + id;

    const [editState, setEditState] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [due_date, setDueDate] = useState("");
    
    const global_tasks = useSelector((state) => state.tasks.value);
    const dispatch = useDispatch();

    useEffect(() => {
      axios.get(url).then(json => dispatch(setTasks(json.data)));
    }, [url,dispatch]);


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

      axios.put(url, 
            {title : title, 
              status : "pending", 
              desc : desc, 
              formated_deadline : due_date, 
              date_added : global_tasks.date_added, 
              priority : global_tasks.priority, 
              id : global_tasks.id, 
              tags: tags}).then(() => history.go())
    }

    return ( 
        <motion.div className="task-details" initial={{y:"100vh"}} animate={{y:0}} transition={{duration : 1}} exit={{x:"-100vw"}}>
            {global_tasks && editState ? (
              <div className="edit-task-details">
                <form onSubmit={handleFormSubmit}>
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
                    <button className="submitBtn">Submit</button>
                  </div>
                </form>
              </div>
            ) : global_tasks && !editState ? (
              <div className="tasklist-details">
                <h2>{global_tasks.title}</h2>
                <p><b>Description :</b> {global_tasks.desc}</p>
                <p><b>Date added :</b> {global_tasks.date_added}</p>
                <p><b>Due date : </b> {global_tasks.formated_deadline}</p>
                <button className="editBtn" onClick={() => {handleEdit(global_tasks.id)}}>{editState ? "Save" : "Edit"}</button>
              </div>
            ) : null}
        </motion.div>
     );
}
 
export default Taskdetails;