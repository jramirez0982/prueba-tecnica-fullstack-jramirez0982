import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {

  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    name:"",
    email:"",
    created_at:"",
  })

  function createContact(e) {
    e.preventDefault();
 
    console.log("ESTOY HAICENDO OPERACIONES EN LA API desde la funcion")
    console.log(newUser)
    
    fetch(import.meta.env.VITE_BACKEND_URL + 'create_user', {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
					'Content-Type': 'application/json'
				}

    })
			.then((response) => {
				if (!response.ok) throw new Error("Error al crear el usuario")
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
      <h1 className='mt-5 p-5'>Crear Nuevo Usuario</h1>
      <div className='d-flex flex-column'>

        <form onSubmit={createContact}>
          <label for="inputFullName" className="form-label d-flex align-items-start mt-3 mb-0 fst-italic">Nombre completo</label>
          <input id="inputFullName" className="form-control" placeholder='Enter your Full Name' name='name' value={newUser.name} 
          onChange={(e)=>{setNewUser({...newUser,name:e.target.value})}} />

          <label for="email" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Correo Electrónico</label>
          <input id="email" className='form-control' placeholder='Enter your email' name='email' value={newUser.email} 
          onChange={(e)=>{setNewUser({...newUser, email:e.target.value})}} />

          <label for="creado_en" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Fecha de creación</label>
          <input type="date"  id='creado_es' className='form-control' placeholder='Ingrese fecha de creacion de la orden' name='creado_en' value={newUser.created_at} 
          onChange={(e)=>{setNewUser({...newUser, created_at:e.target.value})}} />

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
