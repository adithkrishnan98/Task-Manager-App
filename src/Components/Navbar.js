import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const Navbar = (props) => {

    const darkMode = props.darkmode;
    return ( 
        <motion.div className="navbar-content" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <Link to='/' style={{background : !darkMode ? "whitesmoke" : "#004F78", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "4px 4px 1px #dba520" : "2px 2px 1px seashell" }}>My Tasks</Link>
            <Link to='/create' style={{background : !darkMode ? "whitesmoke" : "#004F78", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "4px 4px 1px #dba520" : "2px 2px 1px seashell"}}>Add Tasks</Link>
            <Link to='/finished' style={{background : !darkMode ? "whitesmoke" : "#004F78", color : !darkMode ? "black" : "white", borderColor : !darkMode ? "black" : "white", boxShadow : !darkMode ? "4px 4px 1px #dba520" : "2px 2px 1px seashell"}}>Finished Tasks</Link>
        </motion.div>
     );
}
 
export default Navbar;