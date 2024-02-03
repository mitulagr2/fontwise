'use client'
import { memo, useEffect } from 'react'
import '@material/web/textfield/filled-text-field.js'

const styles = {
  resize: 'none',
  '--md-filled-text-field-container-color':
    'linear-gradient(0deg,rgba(105,145,214,.08),rgba(105,145,214,.08))',
  '--md-filled-text-field-hover-state-layer-color':
    'var(--md-filled-text-field-container-color)',
  '--md-filled-text-field-active-indicator-height': 0,
  '--md-filled-text-field-hover-active-indicator-height': 0,
  '--md-filled-text-field-focus-active-indicator-height': 0,
  '--md-filled-text-field-container-shape': '16px',
  /* --md-filled-text-field-container-shape	4px 
--md-filled-text-field-focus-outline-color	--md-sys-color-primary
--md-filled-text-field-input-text-font	--md-sys-typescale-body-large-font
--md-filled-text-field-label-text-font	--md-sys-typescale-body-large-font */
}

const Input = ({ props, children, handleInput }) => {
  useEffect(() => {
    const input = document.getElementById(props.id)

    input.addEventListener('input', handleInput)

    return () => input.removeEventListener('input', handleInput)
  }, [props.id, handleInput])

  return (
    <md-filled-text-field {...props} style={{ ...styles, ...props.style }}>
      {children}
    </md-filled-text-field>
  )
}

export default memo(Input)
