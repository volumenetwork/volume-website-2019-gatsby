// *************************************************************
// -> Usage: ${fluidType('650px', '1600px', '40px', '88px')}
// *************************************************************

export function fluidType(minVw, maxVw, minFontSize, maxFontSize) {
  return `
  font-size: ${minFontSize};

  @media screen and (min-width: ${minVw}) {
    font-size: calc(${minFontSize} + ${parseFloat(maxFontSize) - parseFloat(minFontSize)} * (100vw - ${minVw}) / ${parseFloat(maxVw) - parseFloat(minVw)});
  }

  @media screen and (min-width: ${maxVw}) {
    font-size: ${maxFontSize};
  }
  `
}

// *************************************************************
// -> Usage: ${aspectRatio(16, 9)}
// *************************************************************
export function aspectRatio(width, height) {
  return `
  position: relative;
  
  &::before {
    display: block;
    content: "";
    width: 100%;
    padding-top: ${(height / width) * 100}%;
  }
  > * {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
  }
  `
}

// *************************************************************
// -> Usage: ${dash()}
// *************************************************************
export function dash() {
  return `
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 0;
    right: 0;
    width: 20px;
    height: 2px;
    margin: 0 auto;
    background: #00D4D4;
  }
  `
}
