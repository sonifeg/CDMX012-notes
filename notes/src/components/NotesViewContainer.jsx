import { useEffect, useState } from "react";
import { getDate } from "../firebase/firebase-notes";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "../firebase/firebase-auth";
import { db, auth } from "../firebase/firebase-config";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { where } from "firebase/firestore";

const MySwal = withReactContent(Swal);

const NotesViewContainer = () => {
  // configurar Hooks
  const [notes, SetNotes] = useState([]);

  //referenciar db firestore
  const notesCollection = collection(db, "notes");

  // funcion mostrar todos los docs de la db
  const getNotes = async () => {
    const user = auth.currentUser.email;
    const q = query(
      notesCollection,
      orderBy("date", "desc"),
      where("email", "==", user)
    );
    const data = await getDocs(q, { includeMetadataChanges: true });
    SetNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // console.log(data.docs);
    // console.log(notes);
  };
  // funcion eliminar un doc
  const deleteNote = async (id) => {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    getNotes();
  };
  // funcion confirmacion Swal

  const confirmDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FFB000",
      cancelButtonColor: "#DE1344",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNote(id);
        MySwal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  // useEffect
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div id="allNotes">
      {notes.map((note) => (
        <section key={note.id} className="cards">
          <p className="notesTitles">{note.title}</p>
          <p className="notesDescriptions">{note.description}</p>
          <div className="containerDateIcons">
            <Link to={`/edit/${note.id}`} className="editIcon">
              <img
                className="editIcon"
                src={require("../assets/edit.png")}
                alt="editIcon"
              />
            </Link>
            <p className="notesDates">{getDate(note.date)}</p>
            <img
              onClick={() => {
                confirmDelete(note.id);
              }}
              className="trashIcon"
              src={require("../assets/trash.png")}
              alt="editIcon"
            />
          </div>
        </section>
      ))}
    </div>
  );
};

export default NotesViewContainer;
