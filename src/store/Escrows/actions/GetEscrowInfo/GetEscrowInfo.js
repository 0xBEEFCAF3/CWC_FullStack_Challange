
export const ESCROW_STATUS_START = `GET_ESCROW_INFO_STATUS_START`;
export const ESCROW_STATUS_SUCCESS = "GET_ESCROW_INFO_STATUS_SUCCESS";
export const ESCROW_STATUS_FAILURE = "GET_ESCROW_INFO_STATUS_FAILURE";


const getStatusStart = () => ({
  type: ESCROW_STATUS_START,
});

const getStatusSuccess = (payload) => ({
  type: ESCROW_STATUS_SUCCESS,
  payload,
});

const getStatusFailure = (error) => ({
  type: ESCROW_STATUS_FAILURE,
  error,
});


export const contestStatus = (contestId) => {
  return (dispatch , getState) => {
  		dispatch(getStatusStart());
    	//make api call
      
  };
};