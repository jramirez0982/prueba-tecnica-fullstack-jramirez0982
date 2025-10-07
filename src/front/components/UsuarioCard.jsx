import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



export const UsuarioCard = (props) => {


  const navigate = useNavigate()

  function eliminarVehiculo(id_vehiculo) {

    const token = localStorage.getItem("jwt_token")
    fetch(import.meta.env.VITE_BACKEND_URL + `eliminar_vehiculo/${id_vehiculo}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token //localStorage.getItem('token') // JWT
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.msg === 'Vehículo eliminado correctamente') {
          //alert('Vehículo eliminado con éxito')
          console.log("Navegando a /vehiculos...")
          props.onDelete();
          //navigate('/vehiculos') //window.location.href = '/vehiculos'
          console.log("despues de navigate")
        } else {
          alert(data.msg)
        }
      })
      .catch(error => {
        console.error('Error:', error)
        //alert('Hubo un error al intentar eliminar el vehículo')

        const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
    <div class="alert alert-danger" role="alert">
      El vehiculo no pudo ser eliminado porque esta asociado a una orden de trabajo.
    </div>
  `;
    setTimeout(() => {
    alertContainer.innerHTML = "";
    }, 5000);


      })
  }
  return (
    <div>
      
      <div className="card border border-2 border-primary mb-3 rounded-4" style={{ Width: "100%" }}>
        <div id="alert-container"></div>
        <div className="row g-0">
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0HF1OkUJZChkjTSK4K-aKyt2vYenTpYsFSw&s" className="p-2 m-2 img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h3 className="card-title d-flex justify-content-start ms-5 mt-3">{props.name}</h3>
              <h5 className="card-text d-flex justify-content-start text-body-secondary ms-5 mt-4">Email: {props.email}</h5>
              <h5 className="card-text d-flex justify-content-start text-body-secondary ms-5 mt-2">Fecha de creacion: {props.fecha_creacion}</h5>
            </div>
          </div>
          <div className="col-md-2 p-4">


            
            <button onClick={() => {
              console.log(props.id_vehiculo)
              eliminarVehiculo(props.id_vehiculo)
            }} className='btn btn-light my-2 mx-5'><i className="fa-solid fa-trash"></i></button>


          </div>
        </div>
      </div>

    </div>

    

  )
}