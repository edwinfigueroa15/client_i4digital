import { NavLink } from "react-router-dom"
import Logo from '../../assets/img/logo_blanco_nombre.svg';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3" aria-label="Eighth navbar example">
            <div className="container">
                <NavLink to="/" className="navbar-brand">
                    <img src={Logo} alt="Logo" style={{ width: '50px' }} />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbars" aria-controls="navbars" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbars" style={{ flexGrow: 'initial' }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link active">Usuarios</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar