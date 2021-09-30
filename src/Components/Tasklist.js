import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";



const Tasklist = (props) => {

    const data = props.tasks;
    const history = useHistory();

    //const {data: all_tasks} = useFetch("http://localhost:8001/notes");

    // function to handle delete of a task
    const handleDelete = (id) => {
        fetch('http://localhost:8001/notes/'+ id , {
            method: "DELETE",
            headers : { "Content-Type": "application/json"},
        }).then(() => {
            history.push("/")
        })
    }

    // function to handle POST request to the server
    const handleChange = (id) => {
        data.map((task) => {
            if(task.id === id){
                const statusState = task.status === "pending" ? "complete" : "pending";
                fetch("http://localhost:8001/notes/" + id, {
                    method: "PUT",
                    headers : { "Content-Type": "application/json"},
                    body : JSON.stringify({title : `${task.title}`, desc : `${task.desc}`, status: statusState})
                }).then(() => {
                    history.push("/");
                }).catch((err) => {
                    err.message();
                })
            }
        })
    }

    // const handleLocalStorage = (id) => {
    //     data.map((task) => {
    //         if(task.id === id){
    //             localStorage.setItem("title", task.title);
    //             localStorage.setItem("desc", task.desc);
    //             localStorage.setItem("date_added", )
    //         }
    //     })
    // }

    return ( 
        <div className="list-container">
            {data.map((task) => (
            <motion.div className="task-container" key={task.id} initial={{y:"100vw"}} animate={{y:0}} transition={{duration:1.5}}>
                <div className="tasks-list">
                    <div className="tasks-info">
                        <h2>{task.title}</h2>
                        <p>{task.desc.slice(0,40) + "..."}</p>
                        {/* onClick={() => {handleLocalStorage(task.id)}} */}
                        <Link to={`/${task.id}`} >Explore</Link>
                        <button className="deleteBtn" onClick={() => {handleDelete(task.id)}}>Delete</button>
                    </div>
                    <div className="tags-info">
                        {/* {task.tags.map(tag => <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3, duration:1.5}}>{"#" + tag}</motion.p>)} */}
                    </div>
                </div>
                
                <motion.div className="task-status" whileHover={{x:10}}>
                    {task.status === "pending" ? 
                    <button className="complete-btn" onClick={() => {handleChange(task.id)}}> Complete
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M387.581 139.712L356.755 109 216.913 248.319l30.831 30.719 139.837-139.326zM481.172 109L247.744 340.469l-91.39-91.051-30.827 30.715L247.744 403 512 139.712 481.172 109zM0 280.133L123.321 403l30.829-30.713L31.934 249.418 0 280.133z"></path>
                        </svg>
                    </button> : <button className="complete-btn" disabled >
                    </button>}
                    
                </motion.div>
            </motion.div>
        ))}
        </div>
     );
}
 
export default Tasklist;