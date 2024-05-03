import React from 'react';
import LogoColor from '/logo-horizon-layout/svg/logo-no-background.svg'

const Logo = (props) => {
  const {style} = props;
  return (
    <img src={LogoColor} alt="logo-color" style={style}/>
  )
}

export default Logo;