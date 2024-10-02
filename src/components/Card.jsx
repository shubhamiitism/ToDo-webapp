import React from 'react'
import '../styles/Card.css'


const Card = ({ id, title, tag }) => {
  return (
    <div className="ticket-card">
      <div className="card-nav">
      <div className="card-id">{id}</div>
      <div className="imageContainer">
                <img style={{width : "100%", height : "100%",  borderRadius : "50%" }}  src="https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="UserImage" />
      </div>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-container">
      
      <div className="card-tag"> <div className='tag-icon'></div>{tag}</div>
      </div>
    </div>
  )
}

export default Card