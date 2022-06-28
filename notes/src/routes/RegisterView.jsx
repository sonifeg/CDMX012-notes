/* eslint-disable no-undef */
import "../components/LoginRegisterView.css";
import { useRef, useState } from "react";
import { register, useAuth } from "../firebase/firebase-auth";
import { useNavigate, Link } from "react-router-dom";
import back from "../assets/backarrow.png";

export default function RegisterView() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const navigate = useNavigate();

  async function handleRegister() {
    setLoading(true);
    try {
      await register(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/notes");
    } catch {
      alert("error!");
    }
    setLoading(false);
  }

  return (
    <section className="login_container">
      <img
        className="logoPostMe"
        src={require("../assets/big-logo.svg").default}
        alt="logoPostMe"
      />
      <Link to="/" className="link">
        <img className="back" src={back} alt="backhome" />
      </Link>
      <form className="containerForm">
        <label id="label1">Create New Account:</label>
        <input
          type="text"
          ref={usernameRef}
          className="inputs"
          id="inputUsername"
          placeholder="Username:"
          autoComplete="off"
          required
        />
        <input
          type="email"
          ref={emailRef}
          className="inputs"
          id="inputEmail"
          placeholder="Email:"
          autoComplete="off"
          required
        />
        <input
          type="password"
          ref={passwordRef}
          className="inputs"
          id="inputPassword"
          placeholder="Password:"
          autoComplete="off"
          required
        />
        <button
          className="btns"
          disabled={loading || currentUser}
          onClick={handleRegister}
        >
          Create
        </button>
      </form>
    </section>
  );
}
