import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {

  const navigate = useNavigate()
  const [contact, setContact] = useState({
    name:"",
    email:"",
    creado_en:"",
  })

  function createContact(e) {
    e.preventDefault();
 
    console.log("ESTOY HAICENDO OPERACIONES EN LA API desde la funcion")
    console.log(contact)
    
    fetch("https://playground.4geeks.com/contact/agendas/julian_ramirezr/contacts", {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
					'Content-Type': 'application/json'
				}

    })
			.then((response) => {
				if (!response.ok) throw new Error("Error al crear nuevo contacto")
				return response.json()
			})
			.then((data) => {
				console.log(data)
				navigate("/")
			})
			.catch((error) => {
				console.log(error)
			})
  }

  return (

<div>
    <nav className="fixed-top navbar navbar-expand-lg navbar-dark shadow-sm ms-2 me-2 px-3" style={{ backgroundColor: '#003366', borderRadius: '15px' }}>
			<div className="container">

				<span className="navbar-brand mb-0 h1">Prueba Técnica Julian Andres Ramirez</span>

				<div className="ml-auto">
					<Link to="/">
						<button className="btn btn-primary">Regresar</button>
					</Link>
				</div>
			</div>
		</nav>
    
    <div className='container text-center mt-5'>
      <h1 className='mt-5 p-5'>Crear nueva orden</h1>
      <div className='d-flex flex-column'>

        <form onSubmit={createContact}>
          <label for="inputFullName" className="form-label d-flex align-items-start mt-3 mb-0 fst-italic">Full Name</label>
          <input id="inputFullName" className="form-control" placeholder='Enter your Full Name' name='name' value={contact.name} 
          onChange={(e)=>{setContact({...contact,name:e.target.value})}} />

          <label for="email" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Email</label>
          <input id="email" className='form-control' placeholder='Enter your email' name='email' value={contact.email} 
          onChange={(e)=>{setContact({...contact, email:e.target.value})}} />

          <label for="creado_en" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Fecha de creación</label>
          <input type="date"  id='creado_es' className='form-control' placeholder='Ingrese fecha de creacion de la orden' name='creado_en' value={contact.creado_en} 
          onChange={(e)=>{setContact({...contact, creado_en:e.target.value})}} />

          <button type='submit' className="btn btn-primary mt-3">Create contact</button>

        </form>

        <Link to="/">
          <a className="d-flex align-items-start">Back Home</a>
        </Link>


      </div>
    </div>
</div>
  )
}
