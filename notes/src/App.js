// import logo from './logo.svg';
import "./App.css";
import LoginView from "./routes/LoginView";
import RegisterView from "./routes/RegisterView";
import NotesView from "./routes/NotesView";
import NewNote from "./routes/NewNote";
import Edit from "./routes/Edit";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
        <Route path="/notes" element={<NotesView />} />
        <Route path="/newNote" element={<NewNote />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
