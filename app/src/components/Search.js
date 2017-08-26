import React, { Component } from 'react';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  submit(e) {

    if (e.keyCode === 13) {
      let url = e.target.value;
      this.props.search(url);

      // TODO: this is mutative - do something reset the value some other way.....
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <input onKeyUp={(e) => this.submit(e)} placeholder='NTS show url goes here' type="text"/>
      </div>
    );
  }
}
