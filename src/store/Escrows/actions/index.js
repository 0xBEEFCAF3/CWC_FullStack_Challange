import * as getEscrows from './getEscrows';
import * as getEscrowInfo from './getEscrowInfo';
import * as AddEscrow from './AddEscrow';

export default {
  ...getEscrows,
  ...getEscrowInfo,
  ...AddEscrow,
};