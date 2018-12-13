import React, { Component } from 'react';
import { connect } from 'react-redux';
import escrowActions from '../../store/Escrows/actions';
import ReactModal from 'react-modal';
import DatePicker from "react-datepicker";
import {FaCalendar } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";

import { Button, FormGroup, ControlLabel, FormControl, HelpBlock, DropdownButton, MenuItem, Label} from 'react-bootstrap';
import {
  Wrapper,
  Title,
  Modal,
  ModalBody,
} from './EscrowModal.styles.js';
import {
 COLOR_POSITIVE,
 COLOR_NEGATIVE,
 COLOR_DARK_GREY,

} from '../../theme';

class EscrowModal extends Component {

  constructor(props) {
    super();
    this.state = {
      modalBody : "Loading...",
      escrowInfo: null,
      datePicked: new Date(),
      amountValidationColor:null,
      dateValidationColor: null,
      globalEscrowInfo: null,
      buttonValidationColor: null,
    }
  }

  componentDidMount(){
    console.log("from did mount", this.props);
    this.props.getEscrowInfo(this.props.exchangeId);
    this.props.getEscrows();
  }

  componentDidUpdate(prevProps){
    if(this.state.escrowInfo == null){
      this.setState({escrowInfo:this.props.escrowInfo[0]});
    }

    if(this.state.globalEscrowInfo == null){
      this.setState({globalEscrowInfo: this.props.globalEscrowInfo});
    }
  }

  requestEscrow = () =>{

    let _this = this;
    let selectedEscrow = this.state.globalEscrowInfo.filter((escrow => escrow.exchangeId == _this.props.exchangeId))[0];

    let params = {
      "exchangeId" : this.props.exchangeId,
      "asset" : this.dropdownSelect.value,
      "amountTraded" : parseInt(this.userAmount.value),
      "amountTotal" : selectedEscrow.amountTotal,
      "expirationTime" : (new Date(this.userDate.value).getTime() / 1000),
      };
      //add to global store
      this.props.addEscrow([params]);
      //close modal
      this.props.closeModal();

  }

  setModalBody = (body) =>{
    this.setState({modalBody:body});
  }

  getValidationState = () =>{
    if(this.state.escrowInfo == null || this.userAmount == null){
      return null;
    }
    /*Validating the user amount*/
    const amountMax = parseInt(this.state.escrowInfo.amountMax);
    const amountMin = parseInt(this.state.escrowInfo.amountMin);
    const userAmount = parseInt(this.userAmount.value);
    const amountValidation = (userAmount > amountMax || userAmount < amountMin);

    if (amountValidation){
      this.setState({amountValidationColor: COLOR_POSITIVE});
    }else{
      this.setState({amountValidationColor: COLOR_NEGATIVE,
      buttonValidationColor: COLOR_NEGATIVE});
      return false;
    }

    /*Validating the date picked by the user*/
    const ts = Math.round((new Date()).getTime() / 1000);
    const dateOfTransaction = new Date(this.userDate.value);
    const minDate = new Date((this.state.escrowInfo.lengthMin + ts) * 1000);
    const maxDate = new Date((this.state.escrowInfo.lengthMax + ts) * 1000);
    const dateValidation = (dateOfTransaction < maxDate && dateOfTransaction > minDate);  
    console.log("THIS DATE:::: ", dateValidation, dateOfTransaction, minDate, maxDate, this.state.escrowInfo.lengthMin+ ts);

    if (dateValidation){
      this.setState({dateValidationColor: COLOR_POSITIVE});
    }else{
      this.setState({dateValidationColor: COLOR_NEGATIVE,
        buttonValidationColor: COLOR_NEGATIVE});
      return false;
    }


    //two fields have passed validation tests
    this.setState({buttonValidationColor: COLOR_POSITIVE});
    return true;
  }

  changeDropDown = (asset) =>{
    this.setState({ assetPicked: this.dropdownSelect.value });
  }

  changeDate = (date) =>{
    this.getValidationState();
    this.setState({
      datePicked : date,
    })
  }

  renderDropDown = () => {
    return (
      <FormControl 
              onChange={this.changeDropDown.bind(this)}
              inputRef={ el => this.dropdownSelect=el }
              componentClass="select" placeholder="select">

      {this.state.escrowInfo.availableAssets.map((asset) =>{
        return <option value={asset}>{asset}</option>
      })}
      </FormControl>
    );
  }

  toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
  }

  renderEscrowInfo = () =>{
    let _this = this;
    let currExchangeId = this.state.escrowInfo.exchangeId;
    let selectedEscrow = this.state.globalEscrowInfo.filter((escrow => escrow.exchangeId == currExchangeId))[0];
    let balance = selectedEscrow["amountTotal"] - selectedEscrow["amountTraded"];
      //calculate the time to expired
      let dateNow = new Date();
      let expDate = new Date(selectedEscrow["expirationTime"] * 1000);

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

    return(<div>
          <span><img src={require('../EscrowTable/'+selectedEscrow["asset"].toUpperCase()+'_icon.png')} /></span> 
          <span> {balance} {selectedEscrow["asset"].toUpperCase()}  <small> {selectedEscrow["amountTraded"]} of {selectedEscrow["amountTotal"]} {selectedEscrow["asset"].toUpperCase()} traded </small> </span>
          <span>{_this.toTitleCase(selectedEscrow["exchangeId"])} </span> 
          <span style={timeUrgency}>{days} DAYS |  {hours} HOURS | {minutes} MINUTES | {seconds} SECONDS</span> 
        </div>);
  }

  renderBody = () =>{
    let _this = this;
    if(this.state.escrowInfo == null) return (<p>"Loading ..." </p>);    
    let amountMin = this.state.escrowInfo.amountMin;
    //validationState={this.getValidationState()}
    return(
      <form>
          <FormGroup
            controlId="formBasicText">
            <ControlLabel>User Escrow for paying fee</ControlLabel>
            {this.renderEscrowInfo()}
        <br />
        <ControlLabel>Asset</ControlLabel>
        {this.renderDropDown()}
        <br />
        
          <ControlLabel>Amount</ControlLabel>
          <FormControl
            type="number"
            inputRef={ el => this.userAmount=el}
            onChange={this.getValidationState}
            style={{backgroundColor: this.state.amountValidationColor}}
          />
          <FormControl.Feedback />
        <br />
          <ControlLabel>Your Wallet address</ControlLabel>
          <FormControl
            type="text"
          />
          <FormControl.Feedback />
        <br />
  
          <ControlLabel>Expires on</ControlLabel> <br />
          <FormControl 
            type="date"
            inputRef={ el => this.userDate=el}
            onChange={this.getValidationState}
            style={{backgroundColor: this.state.dateValidationColor}}
          />
          <FormControl.Feedback />
        </FormGroup>
        <Button onClick={this.requestEscrow} style={{'cursor':'pointer', backgroundColor: this.state.buttonValidationColor}}> Request Escrow </Button>
      </form>
      
      );

  }

  renderReactModal = () =>{
    return (
      <ReactModal 
          isOpen={this.state.modalBody !== null}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => this.setModalBody(null)}
          style={{
            content : {
              backgroundColor: COLOR_DARK_GREY,
              border: 'none',
              width: "900px",
              color: "white",
            }
          }}
        >
          <Button onClick={() => this.props.closeModal()} style={{'cursor':'pointer', 'float':'right'}}> Close </Button>
          <br />
          <h1> New Escrow </h1>
          {this.renderBody()}
        </ReactModal>
        );
  }

  hideModal(){
    this.setState({
      display: false,
    });
  }

  render() {
      return (
        <span>
          {this.renderReactModal()}
        </span>
        );
  }


}

export default connect((store) => {
  console.log(escrowActions);
  return {
    escrowInfo: store.Escrows.Escrows.escrowInfo,
    globalEscrowInfo: store.Escrows.Escrows.escrows,
  }
}, {
    getEscrowInfo: escrowActions.getEscrowInfo,
    getEscrows: escrowActions.getEscrows,
    addEscrow: escrowActions.addEscrow,
})(EscrowModal);
