import React from 'react'
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component'

const Img = ({src,className}) => {
  return (
    <LazyLoadImage
      className={className || ''}
      effect='blur'
      src={src}
    />
  )
}

export default Img