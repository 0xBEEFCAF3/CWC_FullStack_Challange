import React, { Component } from 'react';
import { connect } from 'react-redux';
import escrowActions from '../../store/Escrows/actions'
import Table from 'react-bootstrap/lib/Table';
import { FaCaretDown, FaCaretUp} from 'react-icons/fa'

import {
  COLOR_NEGATIVE,
  COLOR_POSITIVE,
  esTable,
} from './EscrowTable.styles';

class EscrowTable extends Component {

  constructor(props) {
    super();
    this.state = {
      escrows: null,
      seconds:0,
    }
  }

  tick() {
    this.setState(prevState => ({
      seconds: prevState.seconds + 1
      }));
  }

  componentDidMount(){
    this.props.getEscrows();
  }

  componentDidUpdate(prevProps){
    if(this.state.escrows == null ){
      this.setState({'escrows':this.props.Escrows.Escrows.escrows })
      console.log("did update:" + JSON.stringify(this.state));
      this.startTicking();
    }
  }

  startTicking = () =>{
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stopTicking = () => {
    clearInterval(this.interval);
  }

  componentWillUnmount() {
    this.stopTicking();
  }

  toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
  }

  filterTable = (col) =>{
    this.stopTicking();
    console.log(this.state.escrows);
    let sortedEscrows = this.state.escrows;
    if(col == "balance"){
      sortedEscrows.sort((a,b) => (a["amountTotal"] - a["amountTraded"] > b["amountTotal"] - b["amountTraded"]) ? 1 : ((b["amountTotal"] - b["amountTraded"] > a["amountTotal"] - a["amountTraded"]) ? -1 : 0)); 
    }else{
      sortedEscrows.sort((a,b) => (a[col] > b[col]) ? 1 : ((b[col] > a[col]) ? -1 : 0)); 
    }
    this.setState({'escrows':sortedEscrows}); 
    console.log(this.state.escrows);

    this.startTicking();
  }

  renderTableBody = () => {
    if(this.state.escrows == null){
      return <p> Loading... </p>;
    }
    return this.state.escrows.map((row) => {
      let _this = this;
      let balance = row["amountTotal"] - row["amountTraded"];
      //calculate the time to expired
      let dateNow = new Date();
      let expDate = new Date(row["expirationTime"] * 1000);

      let delta = Math.abs(expDate - dateNow) / 1000;

      let days = Math.floor(delta / 86400);
      delta -= days * 86400;

      let hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      let minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;
      let seconds = parseInt( delta % 60);
      let timeUrgency = {};
      if(days <= 1){
         timeUrgency = {'color':COLOR_NEGATIVE};
      }else{
        timeUrgency = {'color':COLOR_POSITIVE};
      }


      return (
        <tr>
          <td><img src={require('./'+row["asset"].toUpperCase()+'_icon.png')} /></td>
          <td>{balance} {row["asset"].toUpperCase()} <p> <small> {row["amountTraded"]} of {row["amountTotal"]} {row["asset"].toUpperCase()} traded </small></p> </td>
          <td>{_this.toTitleCase(row["exchangeId"])}</td>
          <td style={timeUrgency}>{days} DAYS |  {hours} HOURS | {minutes} MINUTES | {seconds} SECONDS</td>
        </tr>
      )
    })
  }

  render() {
    let _this = this;
    return(
      <Table style={esTable} striped bordered hover>
          <thead>
            <tr>
              <th>Asset <FaCaretDown onClick={()=> _this.filterTable("asset") } /></th>
              <th>Available Balance <FaCaretDown onClick={()=> _this.filterTable("balance") } /> </th>
              <th>Exchange <FaCaretDown onClick={()=> _this.filterTable("exchangeId") } /> </th>
              <th>Expires in <FaCaretDown onClick={()=> _this.filterTable("expirationTime") } /> </th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
      </Table>
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
