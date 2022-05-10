import { useState } from "react";
import { logOut } from "../firebase/firebase-auth";
import { useNavigate } from "react-router-dom";
import "../components/NotesView.css";
import smallLogo from "../assets/small-logo.png";
import out from "../assets/out.png";

const HeaderNotes = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <header className="header">
      <img className="small_logo" src={smallLogo} alt="logoPostMeSmall" />
      {/* <p>{user.displayName}</p> */}
      <nav className="icons">
        <p>LogOut</p>
        <img
          className="log_out"
          src={out}
          alt="logOut"
          onClick={handleLogOut}
          disabled={loading}
        />
      </nav>
    </header>
  );
};

export default HeaderNotes;
