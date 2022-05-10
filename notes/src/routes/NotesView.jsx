/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import HeaderNotes from "../components/HeaderNotes";
import NotesViewContainer from "../components/NotesViewContainer";
import FooterNotes from "../components/FooterNotes";
import "../components/NotesView.css";

export default function NotesView() {
  return (
    <section className="notes_container">
      <HeaderNotes />
      {/* --------------------main section------------------------ */}
      <main className="main">
        <figure id="imgcontainer">
          <Link to="/newNote" className="plus">
            <img
              className="plus"
              src={require("../assets/plus.png")}
              alt="addNotes"
            />
          </Link>
        </figure>
        <section className="notes">
          <NotesViewContainer />
        </section>
      </main>
      <FooterNotes />
    </section>
  );
}
