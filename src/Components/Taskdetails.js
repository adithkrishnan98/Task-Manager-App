import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const Taskdetails = () => {
    // allows us to grab route parameters from the url
    const {id} = useParams();
    const history = useHistory();
    const [data, setData] = useState([]);
    const url = "https://fake-server-react-app.herokuapp.com/notes/" + id;

    const [editState, setEditState] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [due_date, setDueDate] = useState("");
    
    useEffect(() => {
      axios.get(url).then(json => setData(json.data));
    }, [url]);


    const handleEdit = (id) => {
      editState ? setEditState(false) : setEditState(true)
      setTitle(data.title);
      setDesc(data.desc);
      setDueDate(data.formated_deadline);
    }


    const handleFormSubmit = (e) => {
      e.preventDefault();

      let tags = [];
        if(data.tags.includes("health")){
            tags.push("health");
        }
        if(data.tags.includes("shopping")){
            tags.push("shopping");
        }
        if(data.tags.includes("personal")){
            tags.push("personal");
        }
        if(data.tags.includes("work")){
            tags.push("work");
        }

      axios.put("http://localhost:8001/notes/" + id, 
            {title : title, 
              status : "pending", 
              desc : desc, 
              formated_deadline : due_date, 
              date_added : data.date_added, 
              priority : data.priority, 
              id : data.id, 
              tags: tags}).then(() => history.go())
    }

    return ( 
        <motion.div className="task-details" initial={{y:"100vh"}} animate={{y:0}} transition={{duration : 1}} exit={{x:"-100vw"}}>
            {data && editState ? (
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
            ) : data && !editState ? (
              <div className="tasklist-details">
                <h2>{data.title}</h2>
                <p>Description : {data.desc}</p>
                <p>Date added : {data.date_added}</p>
                <p>Due date : {data.formated_deadline}</p>
                <button className="editBtn" onClick={() => {handleEdit(data.id)}}>{editState ? "Save" : "Edit"}</button>
              </div>
            ) : null}
        </motion.div>
     );
}
 
export default Taskdetails;