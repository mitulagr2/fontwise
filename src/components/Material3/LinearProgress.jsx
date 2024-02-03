'use client'
import { memo } from 'react'
import '@material/web/progress/linear-progress.js'

const styles = {
  '--md-linear-progress-track-height': '4px',
  // '--md-linear-progress-track-shape': '80px',
  '--md-linear-progress-active-indicator-height': '4px',
  width: '100%',
  zIndex: '1',
}

const LinearProgress = (props) => {
  // console.log('LinearProgress')

  return (
    <md-linear-progress
      style={{ ...styles, ...props.style }}
      four-color
      indeterminate
    ></md-linear-progress>
  )
}

export default memo(LinearProgress)
