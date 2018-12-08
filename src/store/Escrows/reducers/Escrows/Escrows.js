import escrowActions from '../../actions';

const initialState = {
  escrows: [],
  escrowInfo :[],
  
}

const escrows = (state = initialState, action) => {
  switch (action.type) {
    case escrowActions.GET_ESCROW_STATUS_SUCCESS:
      return {
        ...state,
        escrows: action.payload,
      }
    case escrowActions.GET_ESCROW_INFO_STATUS_SUCCESS:
      return {
        ...state,
        escrowInfo: action.payload,
      }
    default:
      return state;
  }
};

export default escrows;