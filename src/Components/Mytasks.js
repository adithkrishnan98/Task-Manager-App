// import useFetch from "./useFetch";
import Tasklist from "./Tasklist";
import { motion } from "framer-motion";
import {useState} from 'react';
import {TiTick} from 'react-icons/ti';



const Mytasks = ({tasks, isPending, error, darkmode, url}) => {

    const [filterClick, setFilerClick] = useState(false);
    const [sortByPriority, setsortByPriority] = useState(false);
    const [sortByDeadline, setsortByDeadline] = useState(false);

    const darkMode = darkmode;
    console.log("Color mode : " + darkMode);
    

    const getSortedData = (sortByPriority, sortByDeadline) => {
        let dataToSort = tasks.filter(task => task.status === "pending");
        let todays_date;
        // let this_month;

        if(sortByPriority){
            dataToSort.sort(function (a,b){
                return a.priority - b.priority;
            })
        }
        if(sortByDeadline){
            todays_date = new Date().getDate();
            // this_month = new Date().getMonth();
            dataToSort.sort(function (a,b){
                return (Math.abs(a.formated_deadline.slice(0,2) - todays_date)) - (Math.abs(b.formated_deadline.slice(0,2)- todays_date));
            })
        }
        return dataToSort;
    }
   
   
    return ( 
        <div className="notes-container">
            <div className="sort-by-container">
                <motion.div className="filter-list" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity : 0}} style={{color : !darkMode ? "black" : "white"}}>
                    <svg onClick={() => !filterClick ? setFilerClick(true) : setFilerClick(false)}  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="filter-icon" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
                    </svg>
                    Sort by
                </motion.div>
                {filterClick ? (
                    <motion.div className="expand-content">
                        <p style={{background : !darkMode ? "whitesmoke" : "#007244", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "3px 3px 1px #dba520" : "2px 2px 1px seashell" }} onClick={() => !sortByPriority ? setsortByPriority(true) : setsortByPriority(false) }>Priority (high - low) {sortByPriority ? <TiTick/> : null}</p>
                        <p style={{background : !darkMode ? "whitesmoke" : "#007244", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "3px 3px 1px #dba520" : "2px 2px 1px seashell" }} onClick={() => !sortByDeadline ? setsortByDeadline(true) : setsortByDeadline(false)}>Deadline (high - low) {sortByDeadline ? <TiTick/> : null}</p>
                        {/* <p style={{background : !darkMode ? "whitesmoke" : "#007244", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "4px 4px 1px rgba(0,0,0,0.3)" : "3px 3px 1px seashell" }} onClick={() => !sortByDate ? setSortbyDate(true) : setSortbyDate(false) }>Date Added {sortByDate ? <TiTick/> : null}</p> */}
                    </motion.div>
                ) : <motion.div className="expand-content" style={{ visibility : "hidden"}}></motion.div>}
            </div>
            <motion.div className="all-notes" exit={{x:'-100vw',transition:{ ease: 'easeInOut', duration:0.7}}}>
            {isPending ? (<p className="spin-loader"></p>) : null}
            {error ? (<div className="error-msg">{error}</div>) : null}
            <Tasklist darkmode={darkMode} url={url} tasks={getSortedData(sortByPriority, sortByDeadline)}/>
            </motion.div>
        </div>
    );
}
 
export default Mytasks;


// Tip : always put fetch requests in useEffect hook if you want it to run jst once at the first while the components are loading