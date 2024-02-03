'use client'
import { memo, useEffect } from 'react'
import '@material/web/dialog/dialog.js'

const styles = {
  '--md-dialog-container-color': '#ffffff',
}

const Dialog = ({
  props,
  headline,
  actions,
  handleClose,
  handleToggle,
  children,
}) => {
  useEffect(() => {
    const dialog = document.getElementById(props.id)

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('closed', handleToggle)

    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('closed', handleToggle)
    }
  }, [handleClose, handleToggle, props.id])

  return (
    <md-dialog {...props} style={{ ...styles, ...props.style }}>
      <div slot="headline">{headline}</div>
      <form slot="content" id="form-id" method="dialog">
        {children}
      </form>
      <div slot="actions">{actions}</div>
    </md-dialog>
  )
}

export default memo(Dialog)
