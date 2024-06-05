import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import TicketInquiryPage from './pages/TicketInquiryPage';
import TicketResultPage from './pages/TicketResultPage';
import TicketsList from './pages/TicketsList';
import PaymentPage from './pages/PaymentPage';
import SelectSeatPage from './pages/SelectSeatPage';
import AdminPanelPage from './pages/AdminPanelPage';
import TicketPurchase from './pages/TicketPurchase';
import AboutPage from './pages/AboutPage';
import PassengerInformationPage from './pages/PassengerInformationPage';
import MyTicketsPage from './pages/MyTicketsPage';
import ProfilePage from './pages/ProfilePage';
import ChatSupport from './components/ChatSupport';
import Footer from './components/Footer';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; 

import logoImage from './img/logo.png';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setUserRole(parsedUser.role); 
    }
  }, []);

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar bg="light" expand="lg" className="navbar-links">
            <Container>
              <Navbar.Brand href="/">
                <img src={logoImage} className="logo" alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/" className="navbar-link">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" className="navbar-link">Contact</Nav.Link>
                  <Nav.Link as={NavLink} to="/ticket-inquiry" className="navbar-link">Ticket Inquiry</Nav.Link>
                  <Nav.Link as={NavLink} to="/about" className="navbar-link">About Us</Nav.Link>
                  {isLoggedIn ? (
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="navbar-link">
                        {user?.firstName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/my-tickets">My Tickets</Dropdown.Item>
                        <LogoutButton handleLogout={handleLogout} />
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Nav.Link as={NavLink} to="/login" className="navbar-link login-button">Login</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/ticket-inquiry" element={<TicketInquiryPage />} />
            <Route path="/ticket-result" element={<TicketResultPage />} />
            <Route path="/ticket" element={<TicketsList />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/SelectSeatPage" element={<SelectSeatPage />} />
            <Route path="/ticket-purchase" element={<TicketPurchase />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Added Forgot Password route */}
            {isLoggedIn && userRole === 'admin' ? (
              <Route path="/admin-dashboard" element={<AdminPanelPage />} />
            ) : (
              <Route path="/admin-dashboard" element={<NotFoundPage />} />
            )}
            {isLoggedIn ? (
              <Route path="/my-tickets" element={<MyTicketsPage user={user} />} />
            ) : (
              <Route path="/my-tickets" element={<NotFoundPage />} />
            )}
            {isLoggedIn ? (
              <Route path="/profile" element={<ProfilePage user={user} />} />
            ) : (
              <Route path="/profile" element={<NotFoundPage />} />
            )}
            <Route path="/passenger-information" element={<PassengerInformationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <ChatSupport />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

const LogoutButton = ({ handleLogout }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout(navigate);
  };

  return (
    <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
  );
};

export default App;
