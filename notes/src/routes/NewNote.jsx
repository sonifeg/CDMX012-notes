/* eslint-disable no-use-before-define */
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { logOut } from "../firebase/firebase-auth";
import "../components/NewNote.css";
import { collection, addDoc } from "../firebase/firebase-auth";
import { db,auth } from "../firebase/firebase-config";

export default function NewNote() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const notesCollection = collection(db, "notes");

  const addNote = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    const date = new Date();
    await addDoc(notesCollection, {
      uid: user.uid,
      ID: notesCollection.id,
      email: user.email,
      username: user.displayName,
      title: title,
      description: description,
      date,
    });
    navigate("/notes");
  };

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
          <form className="newNoteForm" onSubmit={addNote}>
            <label className="labelNotes">Title:</label>
            <input
              type="text"
              // ref={usernameRef}
              className="inputsNote"
              id="inputTitle"
              placeholder="Write a title for your note"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button className="btns btnNote" type="submit">
              Add Note
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
