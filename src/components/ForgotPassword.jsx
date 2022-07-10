import React, { useState } from "react";
import { useRef } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const emailRef = useRef();

  const { forgotPassword } = useAuth();

  const submitBtnHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage("");
      setLoading(true);
      setError("");
      await forgotPassword(emailRef.current.value);
      setMessage("Check mail for further instruction");
    } catch (error) {
      setError("Failed Sign In");
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={submitBtnHandler}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button className="w-100 mt-2" type="submit" disabled={loading}>
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an an account? <Link to="/login">Log In</Link>
      </div>
      <div className="w-100 text-center mt-2">
        Need an an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
