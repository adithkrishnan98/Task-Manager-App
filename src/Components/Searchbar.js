import { BsSearch } from "react-icons/bs";
// import {useState} from 'react';
import { motion } from "framer-motion";

const Searchbar = ({onChange, placeholder}) => {


    return ( 
        <motion.div className="searchbox" initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:2, type:"spring"}} >
            <input type="text" onKeyUp={onChange} placeholder={placeholder}/>
            <div className="input-field">
                <BsSearch className="search-icon"/>
            </div>
        </motion.div>
     );
}
 
export default Searchbar;