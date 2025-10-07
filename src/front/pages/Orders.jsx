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
                            
           
                        }
                        
           
           
                    </div>

        </div>
        
    )
}; 