import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const NuevaOrden = () => {

  const [user, setUser] = useState([])
  const navigate = useNavigate()
  const [newOrder, setNewOrder] = useState({
    id_order: "",
    product_name: "",
    amount: "",
    created_at: "",
    usuario_id: ""
  })

function createOrder(e) {
  e.preventDefault();

   console.log("ESTOY HAICENDO OPERACIONES EN LA API")
    
 //Crea una COPIA del estado para trabajar con ella
   const orderToSend = { ...newOrder }; 

    // --- VALIDACIÓN Y CONVERSIÓN DE AMOUNT (CANTIDAD) ---
    const amountInt = parseInt(orderToSend.amount, 10);
    
    if (isNaN(amountInt) || amountInt <= 0) {
        // La validación falla, se genera alerta ojo.
        alert("La cantidad debe ser un número entero positivo.");
        return; 
    }
    orderToSend.amount = amountInt; // Convertir la cantidad en la COPIA

    // VALIDACIÓN DE USUARIO_ID
    if (orderToSend.usuario_id === "") {
        alert("Debe seleccionar un usuario válido.");
        return;
    }
    
    orderToSend.usuario_id = parseInt(orderToSend.usuario_id, 10); 

    console.log("Objeto a enviar (con tipos corregidos):", orderToSend);

    // Envía la COPIA del objeto
    fetch(import.meta.env.VITE_BACKEND_URL + 'create-order', {
      method: "POST",
      body: JSON.stringify(orderToSend), 
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
        alert("Se produjo un error al crear la orden de servicio. Verifique los datos.")
    })
  }



  function getAllUser() {
    fetch(import.meta.env.VITE_BACKEND_URL + "all_users", {

      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          alert("error en lectura de datos")
        }
        return response.json()
      })

      .then((data) => {
        console.log("estoy trayendo los usuarios a mi pagina")
        console.log(data.usuarios)
        setUser(data.usuarios)
      })
      .catch((error) => { error })
  }

  useEffect(() => {
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
              onChange={(e) => { setNewOrder({ ...newOrder, product_name: e.target.value }) }} />

            <label for="amount" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Cantidad</label>
            <input id="amount" className='form-control' placeholder='Ingrese la cantidad' name='amount' value={newOrder.amount}
              onChange={(e) => { setNewOrder({ ...newOrder, amount:e.target.value }) }} />

            <label for="creado_en" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Fecha de creación</label>
            <input type="date" id='creado_es' className='form-control' placeholder='Ingrese fecha de creacion de la orden' name='creado_en' value={newOrder.created_at}
              onChange={(e) => { setNewOrder({ ...newOrder, created_at: e.target.value }) }} />

            <label htmlFor="usuario_id" className='form-label d-flex align-items-start mt-3 mb-0 fst-italic'>Usuario</label>
            <select
              id='usuario_id'
              className='form-control'
              name='usuario_id'
              value={newOrder.usuario_id}
              onChange={(e) => { setNewOrder({ ...newOrder, usuario_id: e.target.value }) }}
              required // 
            >
              
              <option value="" disabled>Seleccione un usuario...</option>

              {user.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}

              
              {user.length === 0 && <option value="" disabled>No hay usuarios disponibles. Cree uno primero.</option>}
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
