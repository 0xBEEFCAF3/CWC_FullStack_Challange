export const ADD_ESCROW_START = `ADD_ESCROW_START`;
export const ADD_ESCROW_SUCCESS = "ADD_ESCROW_SUCCESS";
export const ADD_ESCROW_FAILURE = "ADD_ESCROW_FAILURE";

const addEscrowStatus = () => ({
  type: ADD_ESCROW_START,
});

const addEscrowSuccess = (payload) => ({
  type: ADD_ESCROW_SUCCESS,
  payload,
});


export const addEscrow = (params) => {
  return (dispatch , getState) => {
  		dispatch(addEscrowStatus());
      //make api call
      //update store      
      dispatch(addEscrowSuccess(params))
  };
};