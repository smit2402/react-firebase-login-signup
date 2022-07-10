import React, { useState } from "react";
import { useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const { logIn } = useAuth();

  const navigate = useNavigate();
  const submitBtnHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed Sign In");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitBtnHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button className="w-100 mt-2" type="submit" disabled={loading}>
              Sign In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgotpassword">Forgot Password? </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default Login;
