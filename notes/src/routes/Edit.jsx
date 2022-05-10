/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { logOut, doc, getDoc, updateDoc  } from "../firebase/firebase-auth";
import "../components/NewNote.css";
import { db } from "../firebase/firebase-config";

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const {id} = useParams()

  const updateNote = async (e) => {
    e.preventDefault()
    const note = doc(db,"notes", id)
    const data = {title: title, description: description}
    await updateDoc(note, data)
    navigate('/notes')
  }

  const getNoteById = async (id) => {
   const note = await getDoc(doc(db,"notes",id))
   if(note.exists()){
     setTitle(note.data().title)
     setDescription(note.data().description)
     console.log(note.data())
   }else{
     console.log("This Note doesn't exist")
   }
  }

  useEffect(()=>{
    getNoteById(id)
  },[])

  async function handleLogOut() {
    setLoading(true);
    try {
      logOut();
    } catch {
      alert("error!");
    }
    setLoading(false);
    navigate("/");
  }

  return (
    <section className="notes_container">
    {/* --------------------header section---------------------- */}
    <header className="header">
      <img
        className="small_logo"
        src={require("../assets/small-logo.png")}
        alt="logoPostMeSmall"
      />
      {/* <p>{user.displayName}</p> */}
      <nav className="icons">
        <p>LogOut</p>
        <img
          className="log_out"
          src={require("../assets/out.png")}
          alt="logOut"
          onClick={handleLogOut}
          disabled={loading}
        />
      </nav>
    </header>

    {/* --------------------main section------------------------ */}
    <main className="main">
      <div id="imgcontainer">
       <Link to="/notes" className="close">
        <img
          className="close"
          src={require("../assets/close.png")}
          alt="closeNote"
        />
       </Link>
      </div>
      <section className="newNote-container">
        <form className="newNoteForm" onSubmit={updateNote}>
          <label className="labelNotes">Title:</label>
          <input
            type="text"
            // ref={usernameRef}
            className="inputsNote"
            id="inputTitle"
            placeholder="Write a title for your note"
            autoComplete="off"
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            required
          />
          <label className="labelNotes">Description:</label>
          <textarea
            type="text"
            // ref={usernameRef}
            className="inputsNote description"
            id="inputDescription"
            placeholder="Write your note here"
            autoComplete="off"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            required
          />
          <button
           className="btns btnNote"
           type="submit"
          >
        Edit Note
      </button>
        </form>
      </section>
    </main>

    {/* --------------------footer section---------------------- */}
    <footer className="footer">
      <img
        className="copy"
        src={require("../assets/copy.png")}
        alt="copyright"
      />
      <p>Copyright Sonia Felizardo Gomez</p>
      <img
        className="github"
        src={require("../assets/github.png")}
        alt="github"
      />
    </footer>
  </section>
);
}