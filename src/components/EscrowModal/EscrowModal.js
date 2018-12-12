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
    }
  }

  componentDidMount(){
    this.props.getEscrowInfo(this.props.exchangeId);
  }

  componentDidUpdate(prevProps){
    if(this.state.escrowInfo == null){
      this.setState({escrowInfo:this.props.escrowInfo[0]});
    }
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
      this.setState({amountValidationColor: COLOR_NEGATIVE});
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
      this.setState({dateValidationColor: COLOR_NEGATIVE});
      return false;
    }

    return true;
  }

  changeDropDown = (asset) =>{
    console.log(asset);
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
        return <option value="asset">{asset}</option>
      })}
      </FormControl>
    );
  }

  renderBody = () =>{
    let _this = this;
    if(this.state.escrowInfo == null) return (<p>"Loading ..." </p>);    
    let amountMin = this.state.escrowInfo.amountMin;
    //validationState={this.getValidationState()}
    return(

      <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>User Escrow paying fee</ControlLabel>
            <FormControl
              type="text"
              value={amountMin}
              disabled
            />
            <FormControl.Feedback />
            <HelpBlock>This field is non adjustable</HelpBlock>
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
      </form>);

  }

  renderReactModal = () =>{
    return (
      <ReactModal 
          isOpen={this.state.modalBody !== null}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => this.setModalBody(null)}
          style={{
            content : {
              backgroundColor: 'transparent',
              border: 'none',
            }
          }}
        >
          <Button onClick={() => this.props.closeModal()} style={{'cursor':'pointer', 'float':'right'}}> Close </Button>
          <br />
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
  return {
    escrowInfo: store.Escrows.Escrows.escrowInfo,
  }
}, {
    getEscrowInfo: escrowActions.getEscrowInfo,
})(EscrowModal);
