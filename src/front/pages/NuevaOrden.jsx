import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";

export const NuevaOrden = () => {

const [user, setUser] = useState([])
const navigate = useNavigate()
const [newOrder, setNewOrder] = useState({
    id_order:"",
    product_name:"",
    amount:"",
    created_at:"",
    usuario_id:""
  })

   function createOrder(e) {
    e.preventDefault();
 
    console.log("ESTOY HAICENDO OPERACIONES EN LA API")
    console.log(newOrder)
    newOrder.amount = parseInt(newOrder.amount)
    
    fetch(import.meta.env.VITE_BACKEND_URL + 'create-order', {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
					'Content-Type': 'application/json'
				}

    })
			.then((response) => {
				if (!response.ok) throw new Error("Error al crear la orden")
				return response.json()
			})
			.then((data) => {
				console.log(data)
				navigate("/orders")
			})
			.catch((error) => {
				console.log(error)
        alert("Se produjo un error al crear la orden de servicio, verifique que la cantidad sea mayor a 0")
			})
  }


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
      <h1 className='mt-5 p-5'>Crear Nuevo Orden de Servicio</h1>
      <div className='d-flex flex-column'>

        <form onSubmit={createOrder}>
          <label for="inputFullName" className="form-label d-flex align-items-start mt-3 mb-0 fst-italic">Nombre del producto</label>
          <input id="inputFullName" className="form-control" placeholder='Ingrese el nombre del producto' name='product_name' value={newOrder.product_name} 
          onChange={(e)=>{setNewOrder({...newOrder,product_name:e.target.value})}} />

          <label for="amount" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Cantidad</label>
          <input id="amount" className='form-control' placeholder='Ingrese la cantidad' name='amount' value={newOrder.amount} 
          onChange={(e)=>{setNewOrder({...newOrder, amount:e.target.value})}} />

          <label for="creado_en" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Fecha de creación</label>
          <input type="date"  id='creado_es' className='form-control' placeholder='Ingrese fecha de creacion de la orden' name='creado_en' value={newOrder.created_at} 
          onChange={(e)=>{setNewOrder({...newOrder, created_at:e.target.value})}} />

          <label htmlFor="usuario_id" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Usuario</label>
                        <select 
                            id='usuario_id' 
                            className='form-control' 
                            name='usuario_id' 
                            value={newOrder.usuario_id}
                            onChange={(e)=>{setNewOrder({...newOrder, usuario_id:e.target.value})}}
                        >
                            
                            {user.length === 0 && <option value="" disabled>Cargando usuarios...</option>}

                            
                            {user.map((user) => (
                                <option 
                                    key={user.id} 
                                    value={user.id} 
                                >
                                    {user.name}  
                                </option>
                            ))}
                        </select>

          <button type='submit' className="btn btn-primary mt-3">Crear orden</button>

        </form>

        <Link to="/">
          <a className="d-flex align-items-start">Back Home</a>
        </Link>


      </div>
    </div>
</div>
  )
}
