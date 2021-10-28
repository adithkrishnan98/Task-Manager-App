import Tasklist from "./Tasklist";
import {motion} from "framer-motion";

const Finishedtasks = ({darkmode, url, tasks}) => {

    return (  
        <motion.div className="finished-tasks">
            {tasks && <Tasklist darkmode={darkmode} url={url} tasks={tasks.filter((task) => task.status==="complete")}/>}
        </motion.div> 
     );
}
 
export default Finishedtasks;