import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import TrainSearchPage from './pages/TrainSearchPage';
import TicketResultPage from './pages/TicketResultPage';
import TicketsList from './pages/TicketsList';
import PaymentPage from './pages/PaymentPage';
import SelectSeatPage from './pages/SelectSeatPage';
import AdminPanelPage from './pages/AdminPanelPage';
import ChatSupport from './components/ChatSupport';
import Footer from './components/Footer';



import logoImage from './img/logo.png';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Navbar expand="lg" className="navbar-links">
            <Container>
              <Navbar.Brand href="/">
                <img src={logoImage} className="logo" alt="logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  <Nav.Link as={NavLink} to="/" className="navbar-link" activeClassName="active">Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/contact" className="navbar-link" activeClassName="active">Contact</Nav.Link>
                  <Nav.Link as={NavLink} to="/ticket-inquiry" className="navbar-link" activeClassName="active">Ticket Inquiry</Nav.Link>
                  {isLoggedIn ? (
                    <Dropdown align="end">
                      <Dropdown.Toggle variant="light" id="dropdown-basic" className="navbar-link">
                        {user?.name}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <Nav.Link as={NavLink} to="/login" className="navbar-link login-button" activeClassName="active">Login</Nav.Link>
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
            <Route path="/ticket-inquiry" element={<TrainSearchPage />} />
            <Route path="/ticket-result" element={<TicketResultPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/ticket" element={<TicketsList />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin-dashboard" element={<AdminPanelPage />} />
            <Route path="/SelectSeatPage" element={<SelectSeatPage />} />
          </Routes>
          <ChatSupport />
        </main>
      </div>

      <Footer />
    </Router>
  );
};

export default App;
