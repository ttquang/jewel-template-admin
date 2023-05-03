import './App.css';
import {TasksProvider} from "./TasksContext";
import TaskList from "./TaskList";
import AddTask from "./AddTask";
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {BookList} from "./BookList";
import {TemplateList} from "./template/listing/TemplateList";
import {Template} from "./template/detail/Template";

// function App() {
//   return (
//     <TasksProvider>
//       <h1>Day off in Kyoto</h1>
//       <AddTask/>
//       <TaskList/>
//     </TasksProvider>
//   );
// }

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/templates">Template</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/templates" element={<TemplateList/>}/>
        <Route path="/templates/:code" element={<Template />} />
      </Routes>
    </>
  );
}

export default App;
