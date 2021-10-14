import { BsSearch } from "react-icons/bs";
// import {useState} from 'react';
import { motion } from "framer-motion";

const Searchbar = ({onChange, placeholder}) => {

    return ( 
        <motion.div className="searchbox">
            <input type="text" onKeyUp={onChange} placeholder={placeholder}/>
            <div className="input-field">
                <BsSearch className="search-icon"/>
            </div>
        </motion.div>
     );
}
 
export default Searchbar;