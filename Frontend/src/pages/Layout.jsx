import { useSelector } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';


function Layout() {
    let userInfo = useSelector((state) => { return state.auth.userInfo })
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/Home">Task Manager</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Nav.Link as={Link} to="/Home"> Home</Nav.Link>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/About">About Us</Nav.Link>
                                {
                                    userInfo &&
                                    <li>
                                        <Nav.Link as={Link} to="/Task">Task</Nav.Link>
                                    </li>
                                }
                                {
                                    !userInfo &&
                                    <li>
                                        <Nav.Link as={Link} to="/Register">Register</Nav.Link>
                                    </li>
                                }
                                {
                                    !userInfo &&
                                    <li>
                                        <Nav.Link as={Link} to="/Login">Login</Nav.Link>
                                    </li>
                                }
                                {
                                    userInfo &&
                                    <li>
                                        <Nav.Link as={Link} to="/Logout">Logout</Nav.Link>
                                    </li>
                                }
                            </Nav>
                            <NavDropdown title="Setting" id="navbarScrollingDropdown">
                                {
                                    !userInfo &&
                                    <NavDropdown.Item href="/ForgetPassword">Forget Password</NavDropdown.Item>
                                }
                                {
                                    userInfo &&
                                    <NavDropdown.Item href="/ChangePassword">Change Password</NavDropdown.Item>

                                }

                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
            <div className="footer">
                <footer>&copy; Copyright</footer>
            </div>
        </>
    )
}
export default Layout


{/* <div>
<ul>
    <li>
        <Link to="/Home">Home</Link>
    </li>
    {
        userInfo &&
        <li>
            <Link to="/Task">Task</Link>
        </li>
    }
    <li>
        <Link to="/About">About</Link>
    </li>
    {
        !userInfo &&
        <li>
            <Link to="/Register">Register</Link>
        </li>
    }
    {
        !userInfo &&
        <li>
            <Link to="/Login">Login</Link>
        </li>
    }
    {
        userInfo &&
        <li>
            <Link to="/Logout">Logout</Link>
        </li>
    }
</ul>
</div> */}