import React, { Component } from 'react'

export default class Search extends Component {
  constructor(props) {
    super(props);
  }


  submit(e) {

    if (e.keyCode === 13) {
      let url = e.target.value;
      this.props.search(url);
      e.target.value = ''
    }

  }

  render() {
    return (
      <div className='search'>
        <input onKeyUp={(e) => this.submit(e)} className='searchInput' placeholder='NTS show url goes here' type="text"/>
      </div>
    )
  }

}
