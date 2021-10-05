import Tasklist from "./Tasklist";
import {motion} from "framer-motion";

const Finishedtasks = ({tasks}) => {

    return (  
        <motion.div className="finished-tasks" exit={{x:'100vw',transition:{duration : 1}}}>
            {tasks && <Tasklist tasks={tasks.filter((task) => task.status==="complete")}/>}
        </motion.div>
     );
}
 
export default Finishedtasks;