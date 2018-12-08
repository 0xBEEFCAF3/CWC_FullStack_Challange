import styled from 'styled-components';
import { transparentize, darken, lighten } from 'polished';
import ReactModal from 'react-modal';
import {
  COLOR_WHITE,
  COLOR_BLACK,
  FONT_SIZE_XSMALL,
  FONT_SIZE_SMALL,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_LARGE,
  FONT_SIZE_XLARGE,
  FONT_CATAMARAN,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_BLACK,
  DIMEN_BORDER_RADIUS,
} from '../../theme';

const CloseIcon = styled.svg`
  cursor: pointer;
  float: right;
`;

const DashboardWrapper = styled.div`
  background-color: #f7f7f7;
  overflow-x: hidden;
  overflow-y: auto;
`;

const DashboardCover = styled.div`
  height:10px;
  background: #134e5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #134e5e, #71b280); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #134e5e, #71b280); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  padding-top: 200px;
  border-bottom: 20px solid ${COLOR_BLACK};
`;


const DashboardBody = styled.div`
  margin-top: -100px;
  padding-bottom: 50px;
`;

const FooterWrapper = styled.div`
  font-family: ${FONT_CATAMARAN};
  display: inherit;
  color: ${COLOR_WHITE};
  width: 100vw;
  background-color: ${COLOR_BLACK};
  @media (max-width: 1000px) {
      display: inline-block;
    }
`;

const FooterHeader = styled.div`
  font-size: ${FONT_SIZE_LARGE};
  font-weight: ${FONT_WEIGHT_BOLD};
  margin: 20px 50px;
  text-align: center;
`;

const FooterBody = styled.div`
  font-size: ${FONT_SIZE_SMALL};
  margin: 20px 70px;
  text-align: center;
`;


export {
  DashboardWrapper,
  DashboardCover,
  DashboardBody,
  FooterWrapper,
  CloseIcon,
  FooterHeader,
  FooterBody,
};