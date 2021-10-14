import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";



const Tasklist = (props) => {

    const data = props.tasks;
    const history = useHistory();

    // function to handle delete of a task
    const handleDelete = (id) => {
        axios.delete("https://fake-server-react-app.herokuapp.com/notes/" + id).then(() => history.go());
    }

    // function to handle POST request to the server
    const handleComplete = (id) => {
        data.map((task) => {
            if(task.id === id){
                axios.patch("https://fake-server-react-app.herokuapp.com/notes/" + id, {status : "complete"}).then(() => history.go());
            }
            return;

        })
    }

    const [pageNumber, setPageNumber] = useState(0);

    const tasksPerPage = 3;
    const pagesVisited = pageNumber * tasksPerPage;
    
    const displayTasks = data.slice(pagesVisited, pagesVisited+tasksPerPage).map((task) => {
        return (
        <motion.div className="task-container" key={task.id} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1.5}} exit={{x:"-100vw"}}>
                <div className="tasks-list" >
                    <div className="tasks-info">
                        <h2>{task.title}</h2>
                        <p>{task.desc.slice(0,40) + "..."}</p>
                        <Link to={`/${task.id}`} >Explore</Link>
                        <button className="deleteBtn" onClick={() => {handleDelete(task.id)}}>Delete</button>
                    </div>
                    <div className="tags-info">
                        {task.tags ? task.tags.map(tag => <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, duration:1.5}}>{"#" + tag}</motion.p>) : null}
                    </div>
                </div>
                
                <motion.div className="task-status" whileHover={{x:10}}>
                    {task.status === "pending" ? 
                    <button className="complete-btn" onClick={() => {handleComplete(task.id)}}> Complete
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M387.581 139.712L356.755 109 216.913 248.319l30.831 30.719 139.837-139.326zM481.172 109L247.744 340.469l-91.39-91.051-30.827 30.715L247.744 403 512 139.712 481.172 109zM0 280.133L123.321 403l30.829-30.713L31.934 249.418 0 280.133z"></path>
                        </svg>
                    </button> : <button className="complete-btn" disabled >
                    </button>}
                </motion.div>
        </motion.div>
    )})

    const pageCount = Math.ceil(data.length / tasksPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    return ( 
        <div className="list-container">
            <div className="tasks-holder">
                {data ? displayTasks : null}
            </div>
            <motion.hr className="hr" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, delay:1}} exit={{opacity:0}}></motion.hr>
            <motion.div initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:1.5, delay:1}}>
                <ReactPaginate previousLabel="Previous" nextLabel="Next" pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationBtns"} previousLinkClassName={"previousBtn"} nextLinkClassName={"nextBtn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}/>
            </motion.div>
        </div>
     );
}
 
export default Tasklist;