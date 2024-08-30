import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import toast from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('/api/auth/forgotpassword', { email });
      toast.success('Password reset link sent');
    } catch (error) {
      toast.error('Failed to send password reset link');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Send Reset Link
        </Button>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
