import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <NavLink to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span className="fs-4">Chitter</span>
                    </NavLink>

                </header>
            </div>
        </>
    )
}

export default Header;