import React, { Component } from 'react'


const Description = ({ description }) => {
  console.log('description', description);
  return (
    <div className='description'>
      <h3>{description.artist}</h3>
      <div>{description.details}</div>
    </div>
  )
}

export default Description