import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Link } from "react-router-dom";
import { UsuarioCard } from "../components/UsuarioCard.jsx";

export const Home = () => {


	const [user, setUser] = useState([])

	function getAllUser(){
		fetch(import.meta.env.VITE_BACKEND_URL + "all_users", {

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
			console.log(data.usuarios)
			setUser(data.usuarios)
		})
		.catch((error)=>{error})
	}


	useEffect(()=>{
		getAllUser()
	}, [])

	return(
		
		<div>
			<Navbar/>	
			<div className="mt-4 text-center">
				<h1 className="mt-5 p-5">Lista de usuarios</h1>
			</div>

			<div className="container d-flex flex-column py-3">
				{
					user.map((usuario, index)=>{

						return(
							<UsuarioCard id_user={usuario.id} name={usuario.name} email={usuario.email} fecha_creacion={usuario.created_at.slice(0, 16)} />
						)

					})

				}
				


			</div>

		</div>
		
	)
}; 