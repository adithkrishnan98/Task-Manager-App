import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";

const Searchbar = ({onChange, placeholder}) => {

    return ( 
        <motion.div className="searchbox">
            <input style={{border : "0.5px solid black"}} type="text" onKeyUp={onChange} placeholder={placeholder}/>
            <div className="input-field">
                <BsSearch className="search-icon"/>
            </div>
        </motion.div>
     );
}
 
export default Searchbar;