import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="fixed-top navbar navbar-expand-lg navbar-dark shadow-sm ms-2 me-2 px-3" style={{ backgroundColor: '#003366', borderRadius: '15px' }}>
			<div className="container">

				<span className="navbar-brand mb-0 h1">Prueba Técnica Julian Andres Ramirez</span>

				<div className="ml-auto">
					<Link to="/add-user">
						<button className="btn btn-primary">Crear Usuario</button>
					</Link>
					<Link to="/orders">
						<button className="btn btn-primary ms-3">Ver Ordenes de servicio</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};