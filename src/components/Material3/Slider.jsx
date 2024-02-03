'use client'
import { memo, useEffect } from 'react'
import '@material/web/slider/slider.js'

const styles = {
  minInlineSize: '192px',
  '--md-slider-handle-color': ' #1a73e8',
  '--md-slider-focus-handle-color': ' #1a73e8',
  '--md-slider-hover-handle-color': ' #1a73e8',
  '--md-slider-active-track-color': ' #1a73e8',
  '--md-slider-inactive-track-color': ' #d2e3fc',
  '--md-slider-label-container-color': ' #1a73e8',
  '--md-slider-ripple-color': ' #1a73e8',
  '--md-slider-hover-ripple-color': ' rgba(26,115,232,.05)',
  '--md-slider-focus-ripple-color': ' rgba(26,115,232,.2)',
  '--mat-slider-value-indicator-opacity': '1',
  // 'margin-right': '8px',
}

const Slider = ({ props, handleSlider, children }) => {
  useEffect(() => {
    const slider = document.getElementById(props.id)

    slider.addEventListener('change', handleSlider)

    return () => slider.removeEventListener('change', handleSlider)
  }, [handleSlider, props.id])

  return (
    <md-slider {...props} style={{ ...styles, ...props.style }}>
      {children}
    </md-slider>
  )
}

export default memo(Slider)
