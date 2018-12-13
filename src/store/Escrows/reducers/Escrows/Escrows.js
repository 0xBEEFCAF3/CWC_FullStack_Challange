import escrowActions from '../../actions';

const initialState = {
  escrows: [],
  escrowInfo :[],
  
}

const escrows = (state = initialState, action) => {
  switch (action.type) {
    case escrowActions.ESCROW_STATUS_SUCCESS:
      return {
        ...state,
        escrows: action.payload,
      }
    case escrowActions.GET_ESCROW_INFO_SUCCESS:
      return {
        ...state,
        escrowInfo: action.payload,
      }
    case escrowActions.ADD_ESCROW_SUCCESS:
      return { 
        ...state,
        escrows: state.escrows.concat(action.payload)
      }
    default:
      return state;
  }
};

export default escrows;