import React, { Component } from 'react';

const PlaylistItem = ({
  artist,
  title,
  select
}) => (
  <div onClick={select}>
    <div>{artist.toUpperCase()}</div>
    <div>{title.toUpperCase()}</div>
  </div>
);

export default PlaylistItem;
