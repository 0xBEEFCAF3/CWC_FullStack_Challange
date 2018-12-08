import styled from 'styled-components';
import { lighten, darken } from 'polished';
import {
  COLOR_WHITE,
  COLOR_BLACK,
  FONT_SIZE_SMALL,
  FONT_SIZE_MEDIUM,
  FONT_SIZE_XLARGE,
  DIMEN_BORDER_RADIUS,
  DIMEN_BORDER_RADIUS_SMALL,
  FONT_CATAMARAN,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_BLACK,
} from '../../theme';

const Wrapper = styled.div`
`;

const Title = styled.h2`
  color: ${COLOR_WHITE};
  text-transform: uppercase;
  text-align: center;
  font-size: ${FONT_SIZE_XLARGE};
  font-weight: ${FONT_WEIGHT_BLACK};
`;

const Modal = styled.div`
  border-bottom-left-radius: ${DIMEN_BORDER_RADIUS};
  border-bottom-right-radius: ${DIMEN_BORDER_RADIUS};
  border-top-left-radius: ${DIMEN_BORDER_RADIUS};
  border-top-right-radius: ${DIMEN_BORDER_RADIUS};
  margin-bottom: 150px;
  background-color: ${COLOR_WHITE};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ModalBody = styled.div`
  background-color: ${COLOR_WHITE};
  padding-bottom: 50px;
`;

export {
  Wrapper,
  Title,
  Modal,
  ModalBody,
};