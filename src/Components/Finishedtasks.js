import Tasklist from "./Tasklist";
import {motion} from "framer-motion";

const Finishedtasks = ({tasks}) => {

    // const {data: tasks, isPending, error} = useFetch("http://localhost:8001/notes");
    // const completedTasks = tasks.filter((task) => task.status==="complete");
    // console.log(completedTasks);
    return (  
        <motion.div className="finished-tasks" exit={{x:'100vw',transition:{duration : 1}}}>
            {/* {isPending && <div className="load-msg">Loading...</div>}
            {error && <div>{error}</div>} */}
            {tasks && <Tasklist tasks={tasks.filter((task) => task.status==="complete")}/>}
        </motion.div>
     );
}
 
export default Finishedtasks;