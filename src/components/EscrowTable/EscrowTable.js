import React, { Component } from 'react';
import { connect } from 'react-redux';
import escrowActions from '../../store/Escrows/actions'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import {
  
} from './EscrowTable.styles';

class EscrowTable extends Component {

  constructor(props) {
    super();
    this.state = {
      escrows: null
    }
  }

  componentDidMount(){
    console.log("mounts: ", this.props)
    this.props.getEscrows();
  }

  componentDidUpdate(prevProps){
    console.log("did update:" + this.props);
    if(this.state.escrows == null && this.props.escrows != null){
      this.state.escrows = this.props.escrows;
    }
  }

  render() {
    return(
      <p> test </p>
    )
  } 
}

export default connect((store) => {
  console.log(escrowActions);
  return {
    Escrows: store.Escrows,
  }
}, {
  getEscrows: escrowActions.getEscrows,
    //include actions escrow actions from store  
})(EscrowTable);
