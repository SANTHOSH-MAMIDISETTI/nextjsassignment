

// "use client"

// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import { Container, Form, Button, Row, Col } from 'react-bootstrap';
// import { TextField } from '@mui/material';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('team member');
//   const [name, setName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/auth/register', { email, password, role, name, phoneNumber });
//       if (response.status === 201) {
//         router.push('/login');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <Container className="mt-1">
//       <Row>
//         <Col md={{ span: 6, offset: 3 }}>
//           <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//             <h2 className="mb-4">Register</h2>
//             <Form.Group className="mb-1">
//               <Form.Label>Name</Form.Label>
//               <TextField 
//                 fullWidth 
//                 type="text" 
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 required 
//                 placeholder="Enter your name" 
//               />
//             </Form.Group>
//             <Form.Group className="mb-1">
//               <Form.Label>Email</Form.Label>
//               <TextField 
//                 fullWidth 
//                 type="email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 required 
//                 placeholder="Enter your email" 
//               />
//             </Form.Group>
//             <Form.Group className="mb-1">
//               <Form.Label>Password</Form.Label>
//               <TextField 
//                 fullWidth 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 required 
//                 placeholder="Enter your password" 
//               />
//             </Form.Group>
//             <Form.Group className="mb-1">
//               <Form.Label>Phone Number</Form.Label>
//               <TextField 
//                 fullWidth 
//                 type="text" 
//                 value={phoneNumber} 
//                 onChange={(e) => setPhoneNumber(e.target.value)} 
//                 required 
//                 placeholder="Enter your phone number" 
//               />
//             </Form.Group>
//             <Form.Group className="mb-1">
//               <Form.Label>Role</Form.Label>
//               <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="team member">Team Member</option>
//                 <option value="admin">Admin</option>
//               </Form.Select>
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Register
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Register;
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team member');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register/', { email, password, role, name, phoneNumber });
      if (response.status === 201) {
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-1">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
       
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <h2 className="mb-4">Register</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter your name" 
              />
            </Form.Group>
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
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required 
                placeholder="Enter your phone number" 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="team member">Team Member</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
