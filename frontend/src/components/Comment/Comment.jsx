import React from 'react'

const Comment = (props) => {
  const {dataHref, width} = props;
  return (
    <div style={{marginTop: "10px"}}>
      <div className="fb-comments" data-href={dataHref} data-width={width} data-numposts="5"></div>
    </div>
  )
}

export default Comment