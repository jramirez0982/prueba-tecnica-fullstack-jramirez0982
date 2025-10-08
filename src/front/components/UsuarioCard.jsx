import React from 'react'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";



export const UsuarioCard = (props) => {

  
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


            <Link to={`/orden-usuario/${props.id_user}`}>
            <button onClick={() => {
              console.log(props.id_user)
            }} className='btn btn-primary my-2 mx-0'>Mis ordenes</button>
            </Link>

          </div>
        </div>
      </div>

    </div>

    

  )
}