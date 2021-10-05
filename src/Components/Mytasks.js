// import useFetch from "./useFetch";
import Tasklist from "./Tasklist";
import { motion } from "framer-motion";
import {useState} from 'react';
import {TiTick} from 'react-icons/ti';


const Mytasks = ({tasks}) => {

    const [filterClick, setFilerClick] = useState(false);
    const [mostImportant, setMostImportant] = useState(false);
    const [leastImportant, setLeastImportant] = useState(false);
    const [sortByDate, setSortbyDate] = useState(false);


   const sortByDateAdded = (task) => {
    // let current_date = new Date().getDate();
    let new_array = [];
    tasks.map(task => new_array.push(task.date_added.slice(0,2)));
    new_array.sort((a,b) => {
        return a - b
    })
    new_array.map(item => {
        return item.toString();
    });
   }
    return ( 
        <div className="notes-container">
            <div className="sort-by-container">
                <motion.div className="filter-list" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} exit={{opacity : 0}}>
                    <svg onClick={() => !filterClick ? setFilerClick(true) : setFilerClick(false)}  stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="filter-icon" height="1.8em" width="1.8em" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
                    </svg>
                    Sort by
                </motion.div>
                {filterClick ? (
                    <motion.div className="expand-content">
                        <p onClick={() => !mostImportant ? setMostImportant(true) : setMostImportant(false) }>Priority (high to low) {mostImportant ? <TiTick/> : null}</p>
                        <p onClick={() => !leastImportant ? setLeastImportant(true) : setLeastImportant(false)}>Deadline (high to low) {leastImportant ? <TiTick/> : null}</p>
                        <p onClick={() => !sortByDate ? setSortbyDate(true) : setSortbyDate(false) }>Date Added {sortByDate ? <TiTick/> : null}</p>
                    </motion.div>
                ) : <motion.div className="expand-content" style={{ visibility : "hidden"}}></motion.div>}
            </div>
            <motion.div className="all-notes" exit={{x:'-100vw',transition:{ ease: 'easeInOut', duration:0.7}}}>
            {tasks && <Tasklist tasks={tasks.filter((task) => task.status==='pending' && (mostImportant ? task.priority === 1  : task) && (leastImportant ? task.priority === 3 : task) && (sortByDate ? task.date_added.slice(0,2) === sortByDateAdded(task) : task))}/>}
            {/* {tasks && sortByDate && <Tasklist tasks={sortByDateAdded(tasks)} />} */}
            </motion.div>
        </div>
    );
}
 
export default Mytasks;


// Tip : always put fetch requests in useEffect hook if you want it to run jst once at the first while the components are loading