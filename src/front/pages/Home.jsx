import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

export const Home = () => {


	const [user, setUser] = useState({
		nombre: "",
		email: "",
		fecha_creacion: "",
		user_id: ""
	})


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
			<div className="mt-5 text-center">
				<h1 className="mt-5 p-5">Lista de usuarios</h1>
			</div>

			<div className="container justify-content-center">
				<h2>aqui van las tarjetas</h2>
			</div>

		</div>
		
	)
}; 