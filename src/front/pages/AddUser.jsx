import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {

  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    name:"",
    email:"",
    created_at:"",
  })

 
  
  function esFormatoCorreoValido(email) {
    // 1. Verificar si es una cadena y no está vacía.
    if (typeof email !== 'string' || email.length === 0) {
        return false;
    }

    // 2. Comprobar la existencia del símbolo '@'.
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
        // No contiene el símbolo '@'
        return false;
    }

    // 3. Comprobar que '@' no sea el primer ni el último carácter.
    if (atIndex === 0 || atIndex === email.length - 1) {
        return false;
    }

    // 4. Comprobar la existencia de un punto '.' después del '@'.
    const dotIndex = email.lastIndexOf('.'); // Usamos lastIndexOf para encontrar el punto del dominio

    // El punto debe existir, debe estar después del '@', y no puede estar justo después del '@'.
    if (dotIndex === -1 || dotIndex < atIndex + 2) {
        return false;
    }

    // 5. Comprobar que el TLD (Top-Level Domain) tenga al menos 2 caracteres
    //    (ej: .co, .net, .com).
    const tldLength = email.length - (dotIndex + 1);
    if (tldLength < 2) {
        return false;
    }

    // Si pasa todas las comprobaciones básicas, se considera válido para este método.
    return true;
}

  let correoValido = (esFormatoCorreoValido(newUser.email))


  function createContact(e) {
    e.preventDefault();
    
    if(!correoValido) {
      alert("El informacion ingresada en email corresponde a una direccion de correo valida ")
    }
    console.log("Inicio operaciones desde la API")
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
				alert("verifique todos los campos, hay errores para crear el registro, cerciorese de que el correo no exista para otro usuario")
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
          <input type="date"  id='creado_es' className='form-control' placeholder='Ingrese fecha de creacion del usuario' name='creado_en' value={newUser.created_at} 
          onChange={(e)=>{setNewUser({...newUser, created_at:e.target.value})}} />

          <button type='submit' className="btn btn-primary mt-3">Crear Usuario</button>

        </form>

        <Link to="/">
          <a className="d-flex align-items-start">Back Home</a>
        </Link>


      </div>
    </div>
</div>
  )
}
