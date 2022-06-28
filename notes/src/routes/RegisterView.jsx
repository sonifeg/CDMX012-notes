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
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  async function handleRegister() {
    setLoading(true);
    try {
      await register(
        usernameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/notes");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setErrorEmail("Invalid email");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorEmail("Email already in use");
      } else if (error.code === "auth/wrong-password") {
        setErrorPassword("Invalid password");
      } else if (error.code === "auth/weak-password") {
        setErrorPassword(" Password should be at least 6 characters ");
      }
    }
    setLoading(false);
  };

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
        <label id="label1">Create Account:</label>
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
        <section className="title-error-sec">
          {errorEmail && <p className="title-error blink">{errorEmail}</p>}
        </section>
        <input
          type="password"
          ref={passwordRef}
          className="inputs"
          id="inputPassword"
          placeholder="Password:"
          autoComplete="off"
          required
        />
        <section className="title-error-sec">
          {errorPassword && (
            <p className="title-error blink">{errorPassword}</p>
          )}
        </section>
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
