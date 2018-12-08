import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Wrapper,
  Title,
  Modal,
  ModalBody,
  Tab,
  NextButton,
  PreviousButton,
  ErrorMessage,
} from './EscrowModal.styles.js';

class EscrowModal extends Component {


  constructor(props) {
    super();
    this.state = {
    }
  }

  componentDidUpdate(prevProps){
   
  }

  hideModal(){
    this.setState({
      display: false,
    });
  }

  render() {
    if(this.state.display){
      return <span style={{display: 'none'}} />;
    }
      return (
        <Wrapper className={`row`}>
          <div className={`col-12`}>
            <div className={`row justify-content-center`}>
              <Modal className={`col-sm-8`}>
                <ModalBody>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </Wrapper>
      );
  }
}

export default connect((store) => {
  return {
    Escrows: store.Escrows.Escrows,
  }

}, {
    //include actions escrow actions from store  
})(EscrowModal);
