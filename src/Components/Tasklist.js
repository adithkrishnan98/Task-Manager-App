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
        axios.delete(props.url+"/" + id).then(() => history.push("/"));
    }

    // function to handle PATCH request to the server
    const handleComplete = (id) => {
        data.map((task) => {
            if(task.id === id){
                axios.patch(props.url+"/" + id, {status : "complete"}).then(() => history.push("/finished"));
            }
            return;
        })
    }

    // function to handle PATCH request to the server
    const handlePending = (id) => {
        data.map((task) => {
            if(task.id === id){
                axios.patch(props.url+"/" + id, {status : "pending"}).then(() => history.push("/"));
            }
            return;
        })
    }

    // pagination logic
    const [pageNumber, setPageNumber] = useState(0);
    const tasksPerPage = 3;
    const pagesVisited = pageNumber * tasksPerPage;
    
    const displayTasks = (darkMode) => data.slice(pagesVisited, pagesVisited+tasksPerPage).map((task) => {
        return (
        <motion.div className="task-container" key={task.id} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{x:"-100vw"}}>
                <div className="tasks-list" key={task.id} style={{borderColor : !darkMode ? "grey" : "white", background : !darkMode ? "whitesmoke" : "#004C74"}}>
                    <div className="tasks-info">
                        <h2 style={{color : !darkMode ? "black" : "white"}}>{task.title}</h2>
                        <p style={{color : !darkMode ? "black" : "white"}}>{task.desc.slice(0,40) + "..."}</p>
                        {task.status === "pending" ? <Link to={`/${task.id}`} style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", border : !darkMode ? "0.5px solid black" : "0.5px solid white"}} >View</Link> : null}
                        <button className="deleteBtn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", border : !darkMode ? "0.5px solid black" : "0.5px solid white"}} onClick={() => {handleDelete(task.id)}}>Delete</button>
                    </div>
                    <div className="tags-info">
                        {task.tags ? task.tags.map(tag => <motion.p style={{backgroundColor : !darkMode ? "#fff180" : "#00AE61", color : !darkMode ? "black" : "white"}} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1, duration:1.5}}>{"#" + tag}</motion.p>) : null}
                    </div>
                </div>
                
                <motion.div className="task-status" whileHover={{x:10}}>
                    {task.status === "pending" ? 
                    <button className="complete-btn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white", boxShadow : !darkMode ? "3px 3px 2px rgb(213, 147, 49)" : "1px 1px 1px seashell" }} onClick={() => {handleComplete(task.id)}}> Complete
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M387.581 139.712L356.755 109 216.913 248.319l30.831 30.719 139.837-139.326zM481.172 109L247.744 340.469l-91.39-91.051-30.827 30.715L247.744 403 512 139.712 481.172 109zM0 280.133L123.321 403l30.829-30.713L31.934 249.418 0 280.133z"></path>
                        </svg>
                    </button> : <button className="complete-btn" style={{backgroundColor : !darkMode ? "#fff199" : "#00AE61", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black": "white", boxShadow : !darkMode ? "3px 3px 2px rgb(213, 147, 49)" : "1px 1px 1px seashell" }} onClick={() => {handlePending(task.id)}}> Pending
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M387.581 139.712L356.755 109 216.913 248.319l30.831 30.719 139.837-139.326zM481.172 109L247.744 340.469l-91.39-91.051-30.827 30.715L247.744 403 512 139.712 481.172 109zM0 280.133L123.321 403l30.829-30.713L31.934 249.418 0 280.133z"></path>
                        </svg>
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
                {data ? displayTasks(props.darkmode) : null}
            </div>
            <motion.hr className="hr" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1, delay:1}} exit={{opacity:0}}></motion.hr>
            <motion.div className="pagination-container"initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:1.5, delay:1}}>
                <ReactPaginate  previousLabel="Previous" nextLabel="Next" pageCount={pageCount} onPageChange={changePage} containerClassName={"paginationBtns"} previousLinkClassName={"previousBtn"} nextLinkClassName={"nextBtn"} disabledClassName={"paginationDisabled"} activeClassName={"paginationActive"}/>
            </motion.div>
        </div>
     );
}
 
export default Tasklist;