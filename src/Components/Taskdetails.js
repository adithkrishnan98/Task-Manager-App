import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch1 from "./useFetch1";
import { useHistory } from "react-router";

const Taskdetails = () => {

    // allows us to grab route parameters from the url
    const {id} = useParams();
    const data = useFetch1("http://localhost:8001/notes/" + id, {});
    const [editState, setEditState] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const getTask = async () => {
      const Task = await data.response;
      // console.log("task details : ", Task.title);
      // setTitle(Task.title);
      // setDesc(Task.desc);
      // console.log(title);
    };
  
    getTask();
    // console.log(tasks);
    // console.log(tasks);

    const history = useHistory();




    const handleEdit = (id) => {
      {editState ? setEditState(false) : setEditState(true)}
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      console.log(title);
      localStorage.setItem("title", title);
      fetch("http://localhost:8001/notes/" + id, {
                    method: "PUT",
                    headers : { "Content-Type": "application/json"},
                    body : JSON.stringify({title : localStorage.getItem("title"), status : "pending", desc : desc})
                }).then(() => {
                    history.go();
                }).catch((err) => {
                    err.message();
                })
      history.go();
    }

    return ( 
        <div className="task-details">
            {data.response && editState ? (
              <div className="edit-task-details">
                <form onSubmit={handleFormSubmit}>
                  <div className="title-holder">
                    <label>Task title</label>
                    <input type="text" className="title-edit-text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="desc-holder">
                    <label>Desc title</label>
                    <input type="text" className="desc-edit-text" required value={desc} onChange={(e) => setDesc(e.target.value)} />
                  </div>
                  <div className="btn-holder">
                    <button className="submitBtn">Submit</button>
                  </div>
                </form>
              </div>
            ) : null}
            {data.response && !editState ? (
              <div className="tasklist-details">
                <h2>{data.response.title}</h2>
                <p>Description : {data.response.desc}</p>
                <p>Date added : {data.response.date_added}</p>
                <p>Due date : {data.response.formated_deadline}</p>
                <button className="editBtn" onClick={() => {handleEdit(data.response.id)}}>{editState ? "Save" : "Edit"}</button>
              </div>
            ) : null}
        </div>
     );
}
 
export default Taskdetails;