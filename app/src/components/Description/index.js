import React, { Component } from 'react';

const Description = ({description}) => {
  return (
    <div>
      <h3>{description.artist}</h3>
      <div>{description.details}</div>
    </div>
  );
};

export default Description;
