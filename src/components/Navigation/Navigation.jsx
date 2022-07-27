import { useContext } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import Loader from '../Loader/Loader'
import Logo from './../Logo/Logo'
import './Navigation.css'


const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    const logout = () => {
        logoutUser()
    }

    const isAdmin = () => {
        if (user?.role === 'ADMIN') {
            return <Link className="first-anchor text-decoration-none" to='/crear'><Nav.Link as="span">Crear coche</Nav.Link></Link>
        }
    }

    return (
        <Navbar className='Navigation' collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Container className='img-logo'>

                    <Link to='/'><Navbar.Brand as='span'>
                        <Logo />
                    </Navbar.Brand></Link>

                </Container>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="ms-auto navbar-option">

                        {isAdmin()}
                        {
                            !user
                                ?
                                <>
                                    <Link className="first-anchor text-decoration-none" to='/registro' ><Nav.Link as="span">Únete</Nav.Link></Link>
                                    <Link className="text-decoration-none" to='/iniciar-sesion'><Nav.Link as="span">Iniciar sesión</Nav.Link></Link>
                                </>
                                :
                                <>
                                    <NavDropdown title="Opciones" id="collasible-nav-dropdown">
                                        <Link to={`/miperfil/${user._id}`}><NavDropdown.Item as="span">Perfil de {user.username}</NavDropdown.Item></Link>
                                        {/* <Link to='/mireserva'><NavDropdown.Item as="span">Mi reserva</NavDropdown.Item></Link> */}
                                        <NavDropdown.Divider />
                                        <Nav.Link onClick={logout}><NavDropdown.Item as="span">Cerrar sesión</NavDropdown.Item></Nav.Link>
                                    </NavDropdown>
                                </>
                        }
                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar >
    )
}

export default Navigation;