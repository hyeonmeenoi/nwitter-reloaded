import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  Wrapper,
  Title,
  Form,
  Input,
  Error,
  Switcher,
  Request,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError("");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    }
  };
  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Log In"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : <></>}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <Request onClick={resetPassword}>Forgot password? </Request>
      <GithubButton />
    </Wrapper>
  );
}
