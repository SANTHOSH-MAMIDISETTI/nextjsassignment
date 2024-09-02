

// import React, { useState, useEffect } from 'react';
// import { Container, Nav, Navbar, NavDropdown, Dropdown } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faBell, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { useAuth } from '../lib/useauth';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import toast from 'react-hot-toast';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';
// import { useRouter } from 'next/router';

// // Optional: Custom styled components
// const NavIcon = styled(FontAwesomeIcon)({
//   color: 'white',
// });

// const Header1: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [pendingCount, setPendingCount] = useState<number>(0);
//   const router = useRouter();

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

//   const handleNotificationClick = () => {
//     if (user && user.role === 'admin') {
//       router.push('/admin2/reviewrequests'); // Admins navigate to the review requests page
//     } else {
//       toast.error('You do not have permission to access this page');
//     }
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
//               <Dropdown.Toggle
//                 variant="link"
//                 id="navbarDropdownMenuLink"
//                 className="text-reset me-3 dropdown-toggle hidden-arrow"
//                 onClick={handleNotificationClick}
//               >
//                 <NavIcon icon={faBell} />
//                 {pendingCount > 0 && (
//                   <span className="badge rounded-pill badge-notification bg-danger">{pendingCount}</span>
//                 )}
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 {pendingCount > 0 ? (
//                   <>
//                     <Dropdown.Item onClick={handleNotificationClick}>
//                       You have {pendingCount} pending review requests
//                     </Dropdown.Item>
//                   </>
//                 ) : (
//                   <Dropdown.Item>No pending requests</Dropdown.Item>
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




import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell } from '@fortawesome/free-solid-svg-icons';
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
    if (user && user.role === 'admin') {
      router.push('/admin2/reviewrequests'); // Admins navigate to the review requests page
    } else {
      toast.error('You do not have permission to access this page');
    }
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        fixed="top" // This makes the navbar fixed at the top
        style={{
          zIndex: 1000,
        }}
      >
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
                    <Dropdown.Item onClick={handleNotificationClick}>
                      You have {pendingCount} pending review requests
                    </Dropdown.Item>
                  ) : (
                    <Dropdown.Item>No pending requests</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  id="navbarDropdownMenuAvatar"
                  className="d-flex align-items-center hidden-arrow"
                >
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

      {/* Add padding to the top of the page content to avoid it being hidden behind the navbar */}
      <div style={{ paddingTop: '70px' }}>
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default Header1;
