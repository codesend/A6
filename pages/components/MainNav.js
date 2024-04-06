import React, { useState } from 'react';
import { Container, Nav, Navbar, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router';
import Link from "next/link";
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { addToHistory } from '@/lib/userData.js';
import { removeToken, readToken } from '@/lib/authenticate';


function MainNav() {
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let token = false;
  token = readToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString))
    router.push(`/artwork?title=true&q=${searchField}`);

  };

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavLink = () => {
    setIsExpanded(false);
  };

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  };

  const renderTruthy = () => (
    <>
      <Nav className="ml-auto">
        <Link href="/" passHref legacyBehavior><Nav.Link active={router.pathname === "/"} onClick={handleNavLink}>Home</Nav.Link></Link>
        <Link href="/search" passHref legacyBehavior><Nav.Link active={router.pathname === "/search"} onClick={handleNavLink}>Advanced Search</Nav.Link></Link>
      </Nav>
      &nbsp;
      <Form className="d-flex" onSubmit={handleSubmit}>
        <FormControl type="search" placeholder="Search" className="mr-2" aria-label="Search" value={searchField}
          onChange={(event) => setSearchField(event.target.value)}
        />
        <Button type="submit" style={{ marginLeft: '0.5em' }} variant="success">Search</Button>
      </Form>
      &nbsp;
      <Dropdown>
        <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ paddingTop: '0.5rem', marginLeft: '0.6rem' }}>
          {token.userName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>
            <Link href="/favourites" passHref legacyBehavior><Nav.Link active={router.pathname === "/favourites"} onClick={handleNavLink}>Favourites</Nav.Link></Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/history" passHref legacyBehavior><Nav.Link active={router.pathname === "/history"} onClick={handleNavLink}>History</Nav.Link></Link>
          </Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );

  const renderFalsy = () => (
    <>
      <Nav>
        <Link href="/register" passHref legacyBehavior><Nav.Link active={router.pathname === "/register"}>Register</Nav.Link></Link>
        <Link href="/login" passHref legacyBehavior><Nav.Link active={router.pathname === "/login"}>Login</Nav.Link></Link>
      </Nav>
    </>
  );

  return (
    <>
      <Navbar expand="sm" expanded={isExpanded} className="navbar-dark bg-dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Navbar.Brand>Daniel Krause</Navbar.Brand>
            <div className="d-flex flex-column flex-sm-row justify-content-sm-end">
              {token ? renderTruthy() : renderFalsy()}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;