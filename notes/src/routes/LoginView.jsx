/* eslint-disable no-unused-vars */
import "../components/LoginRegisterView.css";
import logo from "../assets/big-logo.svg";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import {
  onAuthStateChanged,
  loginGoogle,
  registeredUser,
  userExist,
  login,
} from "../firebase/firebase-auth";

export default function LoginView() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await registeredUser(
          user.uid,
          user.displayName,
          user.email,
          user.photoURL
        );
        const isRegistered = await userExist(user.uid);
        if (isRegistered && user.uid) {
          navigate("/notes");
        }
        console.log(user.displayName);
      }
    });
  }, [navigate]);

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSignIn(e) {
    e.preventDefault();
    login(setErrorEmail, setErrorPassword,emailRef.current.value, passwordRef.current.value);
  }

  return (
    <section className="login_container">
      <img className="logoPostMe" src={logo} alt="logoPostMe" />
      <form className="containerForm">
        <label id="label1">Sign in with:</label>
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
          type="button"
          onClick={handleSignIn}
          disabled={loading}
        >
          Login
        </button>
        <label className="whiteText">Or:</label>
        <button className="btns" onClick={loginGoogle} type="button">
          Google
        </button>
      </form>
      <div className="createAccContainer">
        <label className="whiteText2">Don't have an Acc?</label>
        <Link to="/register" id="btnCreateAcc">
          {" "}
          Create Account{" "}
        </Link>
      </div>
    </section>
  );
}
