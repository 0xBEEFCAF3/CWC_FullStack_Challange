import React, { Component } from 'react';
import {findDOMNode} from 'react-dom'
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import EscrowTable from '../../components/EscrowTable'
import EscrowModal from '../../components/EscrowModal'

import {
  CloseIcon,
  DashboardWrapper,
  DashboardCover,
  DashboardBody,
  FooterWrapper,
  FooterHeader,
  FooterBody,
} from './DashboardContainer.styles';

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalBody: null,
    }
  }

  componentDidMount(prevProps) {
    
  }

  setModalBody = (body) => {
    this.setState({
      modalBody: body,
    })
  }

  componentDidUpdate(prevProps){
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
          <CloseIcon onClick={() => this.setModalBody(null)} style={{'cursor':'pointer', 'float':'right'}}/>
          {this.state.modalBody}
        </ReactModal>
        );
  }


  render() {
    
    var _this = this;
    return (
      <DashboardWrapper className={`row`}>
          {this.renderReactModal()}
        <div className={`col-12`} >
          <DashboardBody className={`row`}>
            <EscrowTable />
          </DashboardBody>
        </div>
        
        <FooterWrapper>
          <div className={`col-lg-6 col-sm-12`} style={{'borderRight': '2px solid white'}}>
            <FooterHeader>
            </FooterHeader>
            <FooterBody>
            </FooterBody>
          </div>
        </FooterWrapper>
      </DashboardWrapper>
    );
  }
}

export default connect((store) => {
  return {
    //store reducx
  }
}, {
    //store actions
})(DashboardContainer);
