import Mytasks from "./Components/Mytasks";
import Navbar from "./Components/Navbar";
import {Route, Switch, useLocation} from 'react-router-dom';
import Createtask from "./Components/CreateTask";
import Finishedtasks from "./Components/Finishedtasks";
import Taskdetails from "./Components/Taskdetails";
import { AnimatePresence, motion } from "framer-motion";
import Searchbar from "./Components/Searchbar";
import Fuse from "fuse.js";
import { useState } from "react";
import db from "./data/db.json";
import useFetch1 from "./Components/useFetch1";


function App() {

  const location = useLocation();
  
  const data = useFetch1("http://localhost:8001/notes/", {});

  const [tasksData, setTasksData] = useState("");

  const getTasks = async () => {
    const Tasks = await data.response;
    setTasksData(Tasks);
    console.log("fetch " , Tasks);
    console.log("db" , db.notes);
  };

  getTasks();

  // search bar functionality
  // console.log("the data is : ", tasksData);
  // console.log(typeof tasksData);

  const searchData = (pattern) => {
    if (!pattern) {
      setTasksData(tasksData);
      return;
    }

    // using Fuse.js to implement search function based on pattern matching
    const fuse = new Fuse(tasksData, {
      keys: ["title", "priority", "tags"],
      shouldSort: true
    });

    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setTasksData([]);                                                                                                                                        
    } else {
      result.forEach(({item}) => {
        matches.push(item);
        console.log(matches);
      });
    setTasksData(matches);
    }
  };



  return (
    <div className="App">
      <motion.h1 initial={{opacity:0}} animate={{opacity:1}} transition={{duration:2}} >Task Manager App</motion.h1>
      <Navbar />
      <Searchbar placeholder="Search tasks by title, priority (1, 2, 3) or tags..." onChange={(e) => searchData(e.target.value)}/>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <Mytasks tasks={tasksData} />
            <motion.hr className="hr" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{opacity:0}}></motion.hr>
          </Route>
          <Route path="/create">
            <Createtask />
          </Route>
          <Route path="/finished">
            <Finishedtasks tasks={tasksData}/>
            <motion.hr initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}} exit={{opacity:0}}></motion.hr>
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
