// // components/Header1.tsx
// // "use client"


// // import React from 'react';
// // import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
// // import { useAuth } from '../lib/useauth';
// // // import { useAuth } from '../context/authcontext'; // Ensure this path is correct
// // import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// // import toast from 'react-hot-toast';

// // const Header1: React.FC = () => {
// //   const { user, logout } = useAuth();

// //   const handleLogout = () => {
// //     logout();
// //     localStorage.removeItem('authToken');
// //     toast.success('Successfully logged out');
// //   };

// //   return (
// //     <Navbar bg="dark" variant="dark" expand="lg">
// //       <Container>
// //         <Navbar.Brand href="/">
// //           <ShoppingCartIcon className="me-2" />
// //           Navbar
// //         </Navbar.Brand>
// //         <Navbar.Toggle aria-controls="navbar-nav" />
// //         <Navbar.Collapse id="navbar-nav">
// //           <Nav className="ms-auto">
// //             <Nav.Link href="/" className="text-orange">
// //               Home
// //             </Nav.Link>

// //             {!user ? (
// //               <>
// //                 <Nav.Link href="/login" className="text-orange">
// //                   Login
// //                 </Nav.Link>
// //                 <Nav.Link href="/signup" className="text-orange">
// //                   Sign up
// //                 </Nav.Link>
// //               </>
// //             ) : (
// //               <NavDropdown title={user.name} id="user-nav-dropdown" menuVariant="dark">
// //                 <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
// //               </NavDropdown>
// //             )}
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Container>
// //     </Navbar>
// //   );
// // };

// // export default Header1;
// import React from 'react';
// import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../lib/useauth';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import toast from 'react-hot-toast';
// import { styled } from '@mui/material/styles'; // For styled components

// // Optional: Custom styled components
// const NavIcon = styled(FontAwesomeIcon)({
//   color: 'white',
// });

// const Header1: React.FC = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem('authToken');
//     toast.success('Successfully logged out');
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container fluid>
//         {/* Navbar brand */}
//         <Navbar.Brand style={{paddingLeft:"7%"}} href="/">
//           <ShoppingCartIcon className="me-2" />
//           Ecommerce
//         </Navbar.Brand>
//         {/* Toggle button */}
//         <Navbar.Toggle aria-controls="navbar-nav">
//           <FontAwesomeIcon icon={faBars} />
//         </Navbar.Toggle>
//         {/* Collapsible wrapper */}
//         <Navbar.Collapse id="navbar-nav">
//           {/* Left links */}
//           <Nav className="me-auto mb-2 mb-lg-0">
//             {/* <Nav.Link href="#">Dashboard</Nav.Link> */}
          
//           </Nav>
//           {/* Right elements */}
//           <div className="d-flex align-items-center justify-content-start">
//             {/* Icon */}
            
//             {/* Notifications */}
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" id="navbarDropdownMenuLink" className="text-reset me-3 dropdown-toggle hidden-arrow">
//                 <NavIcon icon={faBell} />
//                 <span className="badge rounded-pill badge-notification bg-danger">1</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item href="#">Some news</Dropdown.Item>
//                 <Dropdown.Item href="#">Another news</Dropdown.Item>
//                 <Dropdown.Item href="#">Something else here</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//             {/* Avatar */}
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" id="navbarDropdownMenuAvatar" className="d-flex align-items-center hidden-arrow">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//                   className="rounded-circle"
//                   height="25"
//                   alt="Avatar"
//                   loading="lazy"
//                 />
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item href="#">My profile</Dropdown.Item>
//                 <Dropdown.Item href="#">Settings</Dropdown.Item>
//                 <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header1;

import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../lib/useauth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/router';

// Optional: Custom styled components
const NavIcon = styled(FontAwesomeIcon)({
  color: 'white',
});

const Header1: React.FC = () => {
  const { user, logout } = useAuth();
  const [pendingCount, setPendingCount] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const fetchPendingCount = async () => {
      if (!user || !user.token) return;

      try {
        const response = await axios.get('/api/reviews/pendingcount', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setPendingCount(response.data.count);
      } catch (error) {
        console.error('Error fetching pending count:', error);
        toast.error('Failed to fetch pending review count');
      }
    };

    fetchPendingCount();
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    toast.success('Successfully logged out');
  };

  const handleNotificationClick = () => {
    router.push('/admin2/reviewrequests'); // Change this route to the actual path of your review requests page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand style={{ paddingLeft: '7%' }} href="/">
          <ShoppingCartIcon className="me-2" />
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav">
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0"></Nav>
          <div className="d-flex align-items-center justify-content-start">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="navbarDropdownMenuLink"
                className="text-reset me-3 dropdown-toggle hidden-arrow"
                onClick={handleNotificationClick}
              >
                <NavIcon icon={faBell} />
                {pendingCount > 0 && (
                  <span className="badge rounded-pill badge-notification bg-danger">{pendingCount}</span>
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {pendingCount > 0 ? (
                  <>
                    <Dropdown.Item onClick={handleNotificationClick}>
                      You have {pendingCount} pending review requests
                    </Dropdown.Item>
                  </>
                ) : (
                  <Dropdown.Item>No pending requests</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="navbarDropdownMenuAvatar" className="d-flex align-items-center hidden-arrow">
                <img
                  src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                  className="rounded-circle"
                  height="25"
                  alt="Avatar"
                  loading="lazy"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">My profile</Dropdown.Item>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header1;






// import React, { useState, useEffect } from 'react';
// import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../lib/useauth';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import toast from 'react-hot-toast';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';

// // Optional: Custom styled components
// const NavIcon = styled(FontAwesomeIcon)({
//   color: 'white',
// });

// const Header1: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [pendingCount, setPendingCount] = useState<number>(0);

//   useEffect(() => {
//     const fetchPendingCount = async () => {
//       if (!user || !user.token) return;

//       try {
//         const response = await axios.get('/api/reviews/pendingcount', {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         });
//         setPendingCount(response.data.count);
//       } catch (error) {
//         console.error('Error fetching pending count:', error);
//         toast.error('Failed to fetch pending review count');
//       }
//     };

//     fetchPendingCount();
//   }, [user]);

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem('authToken');
//     toast.success('Successfully logged out');
//   };

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container fluid>
//         <Navbar.Brand style={{ paddingLeft: '7%' }} href="/">
//           <ShoppingCartIcon className="me-2" />
//           Ecommerce
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbar-nav">
//           <FontAwesomeIcon icon={faBars} />
//         </Navbar.Toggle>
//         <Navbar.Collapse id="navbar-nav">
//           <Nav className="me-auto mb-2 mb-lg-0"></Nav>
//           <div className="d-flex align-items-center justify-content-start">
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" id="navbarDropdownMenuLink" className="text-reset me-3 dropdown-toggle hidden-arrow">
//                 <NavIcon icon={faBell} />
//                 {pendingCount > 0 && (
//                   <span className="badge rounded-pill badge-notification bg-danger">{pendingCount}</span>
//                 )}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {pendingCount > 0 ? (
//                   <>
//                     <Dropdown.Item href="#">You have {pendingCount} pending review requests</Dropdown.Item>
//                     {/* More items can be added here */}
//                   </>
//                 ) : (
//                   <Dropdown.Item href="#">No pending requests</Dropdown.Item>
//                 )}
//               </Dropdown.Menu>
//             </Dropdown>
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" id="navbarDropdownMenuAvatar" className="d-flex align-items-center hidden-arrow">
//                 <img
//                   src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
//                   className="rounded-circle"
//                   height="25"
//                   alt="Avatar"
//                   loading="lazy"
//                 />
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item href="#">My profile</Dropdown.Item>
//                 <Dropdown.Item href="#">Settings</Dropdown.Item>
//                 <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header1;
