import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { UsuarioCard } from "../components/UsuarioCard.jsx";

export const Orders = () => {


    const [order, setOrder] = useState([])

    function getAllOrders(){
        fetch(import.meta.env.VITE_BACKEND_URL + "all_orders", {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response)=>{
            if (!response.ok){
                alert("error en lectura de datos")
            }	
            return response.json()
        })

        .then((data)=>{
            console.log("estoy trayendo los usuarios a mi pagina")
            console.log(data.ordenes)
            setOrder(data.ordenes)
        })
        .catch((error)=>{error})
    }


    useEffect(()=>{
        getAllOrders()
    }, [])

    return(
        
        <div>
            <div>
                <nav className="fixed-top navbar navbar-expand-lg navbar-dark shadow-sm ms-2 me-2 px-3" style={{ backgroundColor: '#003366', borderRadius: '15px' }}>
			<div className="container">

				<span className="navbar-brand mb-0 h1">Prueba Técnica Julian Andres Ramirez</span>

				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-primary">Regresar</button>
					</Link>
					<Link to="/add-user">
						<button className="btn btn-primary ms-3">Crear orden</button>
					</Link>
				</div>
			</div>
		</nav>
            </div>	
            <div className="mt-4 text-center">
                <h1 className="mt-5 p-5">Lista de ordenes de servicio</h1>
            </div>

           <div className="container d-flex flex-column py-3">
                        {
                            <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Nro. de Órden</th>
                <th>Vehículo</th>
                <th>Mecanico</th>
                <th>Servicios</th>
                <th>Fecha de ingreso</th>
                <th>Fecha de salida</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {order.map((orden) => (
                <tr key={orden.id}>
                  <td>orden.id_ot</td>
                  <td>orden.matricula_vehiculo</td>
                  <td>orden.nombre_mecanico</td>
                  <td>orden.servicios_asociados.map(s = s.servicio.name_service).join(", ")</td>
                  <td>orden.fecha_ingreso.slice(0, 16)</td>
                  <td>orden.fecha_final ? String(orden.fecha_final).slice(0, 16) : ""</td>
                  <td>getEstadoBadge(orden.estado_servicio)</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
           
                        }
                        
           
           
                    </div>

        </div>
        
    )
}; 