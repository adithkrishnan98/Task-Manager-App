import Tasklist from "./Tasklist";
import {motion} from "framer-motion";

const Finishedtasks = ({tasks}) => {

    return (  
        <motion.div className="finished-tasks">
            {tasks && <Tasklist tasks={tasks.filter((task) => task.status==="complete")}/>}
        </motion.div>
     );
}
 
export default Finishedtasks;