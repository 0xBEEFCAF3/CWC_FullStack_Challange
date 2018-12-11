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
  CloseIcon,
} from '../../containers/DashboardContainer/DashboardContainer.styles';

class EscrowModal extends Component {

  constructor(props) {
    super();
    this.state = {
      modalBody : "Loading...",
      escrowInfo: null,
      datePicked: new Date(),
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

  getValidationState() {
    const length = 11;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  changeDropDown = (e) =>{
    console.log(e);
    this.setState({ assetPicked: e });
  }

  changeDate = (date) =>{
    this.setState({
      datePicked : date,
    })
  }

  renderDropDown = () => {
    return (
      <DropdownButton
        bsStyle= "primary"
        title="Available Assets"
        id={`dropdown-basic`}
        onSelect={this.changeDropDown}
      >
      {this.state.escrowInfo.availableAssets.map((asset) =>{
        return <MenuItem>{asset}</MenuItem>
      })}
      </DropdownButton>
    );
  }

  renderBody = () =>{
    if(this.state.escrowInfo == null){
      return(<p> Loading... </p>);
    }
    console.log(this.state.escrowInfo);
    let amountMin = this.state.escrowInfo.amountMin;
    return(

      <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}>
            <ControlLabel>User Escrow paying fee</ControlLabel>
            <FormControl
              type="text"
              value={amountMin}
              disabled
            />
            <FormControl.Feedback />
            <HelpBlock>This field is non adjustable</HelpBlock>
        <br />
        {this.renderDropDown()}
        <br />
        
          <ControlLabel>Amount</ControlLabel>
          <FormControl
            type="number"
          />
          <FormControl.Feedback />
        <br />
          <ControlLabel>Your Wallet address</ControlLabel>
          <FormControl
            type="text"
          />
          <FormControl.Feedback />
        <br />
  
          <ControlLabel>Expires on</ControlLabel>
          <DatePicker 
            selected={this.state.datePicked} 
            onChange={this.changeDate}
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
