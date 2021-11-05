import Mytasks from "./Components/Mytasks";
import Navbar from "./Components/Navbar";
import {Route, Switch, useLocation} from 'react-router-dom';
import Createtask from "./Components/CreateTask";
import Finishedtasks from "./Components/Finishedtasks";
import Taskdetails from "./Components/Taskdetails";
import { AnimatePresence, motion } from "framer-motion";
import Searchbar from "./Components/Searchbar";
import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {toggleDarkMode } from "./features/darkmode";

function App() {

  const location = useLocation();

  const url = "https://fake-server-react-app.herokuapp.com/notes";

  const [tasksData, setTasksData] = useState([]);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    axios.get(url).then(json => {
      setTasksData(json.data.slice(0,30).reverse()); 
      setIsPending(false);
      setError("")}
    ).catch(error => {
      setError("Error retrieving data! Please try after sometime");
      setIsPending(false);
    });
}, [location]);

  const searchData = (pattern) => {
    if (!pattern) {
      axios.get(url).then(json => setTasksData(json.data.slice(0,30).reverse()));
      return;  
    }

    // using Fuse.js to implement search function based on pattern matching
    const fuse = new Fuse(tasksData, {
      keys: ["title", "priority", "tags"]
    });

    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setTasksData([]);                                                                                                                                     
    } else {
      result.forEach(({item}) => {
        matches.push(item);
      });
    setTasksData(matches);
    console.log(matches);
    }
  };

  const darkMode = useSelector((state) => state.darkLightSwitch.value);
  const dispatch = useDispatch();

  // background-image : radial-gradient(#081D34, #081D34)
 
  return (
      <div className="inner-container" style={{backgroundImage : !darkMode ? "radial-gradient(#ffd966, #FFCC2C)" : "radial-gradient(#14467D, #081D34)", borderColor : !darkMode ? "black" : "white"}}> 
        <div className="toggle-box">
            {!darkMode ? <motion.svg className="moon-icon" onClick={() => dispatch(!darkMode ? toggleDarkMode(true) : toggleDarkMode(false))} stroke="currentColor" fill="black" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" >
                <motion.path initial={{opacity : 0}} animate={{opacity : 1, rotate : 360}} transition={{duration : 1}}  whileHover={{rotate : 180}}  d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></motion.path>
              </motion.svg> : 
              <svg className="sun-icon" onClick={() => dispatch(!darkMode ? toggleDarkMode(true) : toggleDarkMode(false))} stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <motion.path initial={{rotate : 0}} animate={{rotate : 360}} whileHover={{rotate : 180}} d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></motion.path>
              </svg>}
        </div>
        <div className="App">
            <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} style={{color : darkMode ? "white" : "black"}} >Task Manager</motion.h1>
            <Navbar darkmode={darkMode} />
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.key}>
                <Route exact path="/">
                  <motion.div className="searchbar-container" initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:1, type:"spring"}} exit={{x:"100vw"}}>
                    <Searchbar placeholder="Search tasks by title, priority (1, 2, 3) or tags..." onChange={(e) => searchData(e.target.value)} />
                  </motion.div>
                  <Mytasks  darkmode={darkMode} url={url} tasks={tasksData} isPending={isPending} error={error}/>
                </Route> 
                <Route path="/create">
                  <Createtask darkmode={darkMode} url={url}/>
                </Route>
                <Route path="/finished">
                  <Finishedtasks darkmode={darkMode} url={url} tasks={tasksData}/>
                </Route>
                <Route path="/:id">
                  <Taskdetails  url={url} darkmode={darkMode}/>
                </Route>
              </Switch>
            </AnimatePresence>
          </div>
        </div>
  );
}

export default App;
