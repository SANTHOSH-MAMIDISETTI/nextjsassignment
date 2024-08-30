

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../lib/useauth';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      if (user) {
        // Redirect based on the role
        if (user.role === 'admin') {
          router.push('/admin/dashboard');
        } else if (user.role === 'team member') {
          router.push('/team/dashboard');
        } else {
          router.push('/unauthorized');
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Toaster />
      <Row className="justify-content-center w-100">
        <Col md={6} lg={5}>
          <Card className="p-4 shadow-sm" >
            <Card.Body>
              <h2 className="mb-4 text-center">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                  />
                  <Form.Group controlId="formBasicCheckbox" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </Form.Group>
                </Form.Group>
         
                <Button variant="primary" type="submit" style={{ width: "100%" }}>
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

