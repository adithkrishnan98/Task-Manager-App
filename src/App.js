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

function App() {

  const location = useLocation();

  const url = "https://fake-server-react-app.herokuapp.com/notes";

  const [tasksData, setTasksData] = useState([]);

  useEffect(() => {
    axios.get(url).then(json => setTasksData(json.data));
  }, []);

  const searchData = (pattern) => {
    if (!pattern) {
      axios.get(url).then(json => setTasksData(json.data));
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
    }
  };


  return (
    <div className="App">
      <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} >Task Manager App</motion.h1>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <motion.div className="searchbar-container" initial={{x:"-100vw"}} animate={{x:0}} transition={{duration:1, type:"spring"}} exit={{x:"100vw"}}>
              <Searchbar placeholder="Search tasks by title, priority (1, 2, 3) or tags..." onChange={(e) => searchData(e.target.value)} />
            </motion.div>
            <Mytasks tasks={tasksData} />
            <motion.hr className="hr" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{opacity:0}}></motion.hr>
          </Route> 
          <Route path="/create">
            <Createtask />
          </Route>
          <Route path="/finished">
            <Finishedtasks tasks={tasksData}/>
            <motion.hr className="hr" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{opacity:0}}></motion.hr>
          </Route>
          <Route path="/:id">
            <Taskdetails />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  );
}

export default App;
