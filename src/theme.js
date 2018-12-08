export const COLOR_WHITE                = `#fff`;
export const COLOR_BLACK                = `#3C3C3C`;
export const COLOR_DARK_GREY            = `#64696E`;
export const COLOR_LIGHT_GREY           = `#BEC8D2`;
export const COLOR_POSITIVE           = `#00AFBE`;
export const COLOR_NEGATIVE           = `#FF8A5B`;

export const FONT_CATAMARAN             = `'Catamaran', sans-serif;`;

export const FONT_SIZE_XSMALL           = `16px;`;
export const FONT_SIZE_SMALL            = `18px;`;
export const FONT_SIZE_MEDIUM           = `24px;`;
export const FONT_SIZE_LARGE            = `32px;`;
export const FONT_SIZE_XLARGE           = `48px;`;

export const FONT_WEIGHT_REGULAR        = 400;
export const FONT_WEIGHT_BOLD           = 700;
export const FONT_WEIGHT_BLACK          = 900;

export const DIMEN_BORDER_RADIUS        = `20px`;
export const DIMEN_BORDER_RADIUS_SMALL  = `10px`;

import { injectGlobal } from 'styled-components';


injectGlobal`
  h1, h2, h3, h4, h5, p {
    font-family: ${FONT_CATAMARAN};
  }
  button {
  	cursor:pointer;
  }
`;