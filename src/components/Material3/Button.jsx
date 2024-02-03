'use client'
import { memo, useEffect } from 'react'
import '@material/web/button/outlined-button.js'
import '@material/web/button/text-button.js'
import '@material/web/button/filled-button.js'
import '@material/web/button/filled-tonal-button.js'
import '@material/web/iconbutton/icon-button.js'

const stylesIcon = {
  /* --md-icon-button-icon-color	--md-sys-color-on-surface-variant
--md-icon-button-state-layer-shape	9999px
--md-icon-button-icon-size	24px */
}

const stylesFilled = {
  '--md-filled-button-hover-container-elevation': '0',
  '--md-filled-button-hover-state-layer-color': 'rgba(60,64,67,.3)',
  '--md-filled-button-hover-state-layer-opacity': '1',
  // box-shadow: 0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15);
  /* --md-icon-button-icon-color	--md-sys-color-on-surface-variant
--md-icon-button-state-layer-shape	9999px
--md-icon-button-icon-size	24px */
}

const stylesFilledTonal = {
  '--md-filled-tonal-button-container-color': 'rgba(105,145,214,.08)',
  '--md-filled-tonal-button-hover-container-elevation': '0',
  /* --md-icon-button-icon-color	--md-sys-color-on-surface-variant
--md-icon-button-state-layer-shape	9999px
--md-icon-button-icon-size	24px */
}

const stylesText = {
  /* --md-icon-button-icon-color	--md-sys-color-on-surface-variant
--md-icon-button-state-layer-shape	9999px
--md-icon-button-icon-size	24px */
}

const stylesOutlined = {
  /* --md-icon-button-icon-color	--md-sys-color-on-surface-variant
--md-icon-button-state-layer-shape	9999px
--md-icon-button-icon-size	24px */
}

const Button = ({ props, type, icon, handleBtn, children }) => {
  useEffect(() => {
    if (handleBtn) {
      const btn = document.getElementById(props.id)
      const eventType = type === 'icon' ? 'change' : 'click'

      !props.href && btn.addEventListener(eventType, handleBtn)

      return () => !props.href && btn.removeEventListener('change', handleBtn)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  switch (type) {
    case 'icon':
      return (
        <md-icon-button {...props} style={{ ...stylesIcon, ...props.style }}>
          {children}
          {icon && (
            <>
              <md-icon>{icon}</md-icon>
              <md-icon filled slot="selected">
                {icon}
              </md-icon>
            </>
          )}
        </md-icon-button>
      )
    case 'filled':
      return (
        <md-filled-button
          {...props}
          style={{ ...stylesFilled, ...props.style }}
        >
          {children}
          {icon && <md-icon slot="icon">{icon}</md-icon>}
        </md-filled-button>
      )
    case 'filled-tonal':
      return (
        <md-filled-tonal-button
          {...props}
          style={{ ...stylesFilledTonal, ...props.style }}
        >
          {children}
          {icon && <md-icon slot="icon">{icon}</md-icon>}
        </md-filled-tonal-button>
      )
    case 'text':
      return (
        <md-text-button {...props} style={{ ...stylesText, ...props.style }}>
          {children}
          {icon && <md-icon slot="icon">{icon}</md-icon>}
        </md-text-button>
      )
    case 'outlined':
      return (
        <md-outlined-button
          {...props}
          style={{ ...stylesOutlined, ...props.style }}
        >
          {children}
          {icon && <md-icon slot="icon">{icon}</md-icon>}
        </md-outlined-button>
      )
    default:
      return <></>
  }
}

export default memo(Button)
