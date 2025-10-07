import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Navbar } from "../components/Navbar.jsx";
import { Link } from "react-router-dom";

export const Home = () => {

	return(
		
		<div>
			<Navbar/>	
			<div className="mt-5 text-center">
				<h1 className="mt-5 p-5">Ordenes de Servicio</h1>
			</div>
		</div>
		
	)
}; 