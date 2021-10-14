import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
    return ( 
        <motion.div className="navbar-content" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <Link to='/'>My Tasks</Link>
            <Link to='/create'>Add Tasks</Link>
            <Link to='/finished'>Finished Tasks</Link>
        </motion.div>
     );
}
 
export default Navbar;