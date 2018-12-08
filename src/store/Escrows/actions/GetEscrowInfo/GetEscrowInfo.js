export const GET_ESCROW_INFO_START = `GET_ESCROW_INFO_START`;
export const GET_ESCROW_INFO_SUCCESS = "GET_ESCROW_INFO_SUCCESS";
export const GET_ESCROW_INFO_FAILURE = "GET_ESCROW_INFO_FAILURE";

const getStatusStart = () => ({
  type: GET_ESCROW_INFO_START,
});

const getStatusSuccess = (payload) => ({
  type: GET_ESCROW_INFO_SUCCESS,
  payload,
});

const getStatusFailure = (error) => ({
  type: GET_ESCROW_INFO_FAILURE,
  error,
});


export const getEscrowInfo = (escrow) => {
  return (dispatch , getState) => {
  		dispatch(getStatusStart());
    	//make api call
    	let data = [
   {
      "exchangeId":"poloniex",
      "availableAssets":[
         "btc",
         "ltc",
         "bch"
      ],
      "amountMin":100000,
      "amountMax":10000000000,
      "lengthMin":86400,
      "lengthMax":2628000
   },
   {
      "exchangeId":"kraken",
      "availableAssets":[
         "btc",
         "ltc"
      ],
      "amountMin":100000,
      "amountMax":10000000000,
      "lengthMin":604800,
      "lengthMax":2628000
   },
   {
      "exchangeId":"bittrex",
      "availableAssets":[
         "btc",
         "ltc",
         "bch"
      ],
      "amountMin":10000000,
      "amountMax":1000000000,
      "lengthMin":86400,
      "lengthMax":2628000
   },
   {
      "exchangeId":"paymium",
      "availableAssets":[
         "btc",
         "bch"
      ],
      "amountMin":10000000,
      "amountMax":1000000000,
      "lengthMin":3600,
      "lengthMax":604800
   }
];
      dispatch(getStatusSuccess(data))

  };
};