'use client'
import { memo, useEffect } from 'react'
import '@material/web/menu/menu.js'
import '@material/web/menu/menu-item.js'

const styles = {
  '--md-menu-container-color': '#ffffff',
  '--md-menu-container-elevation': '3',
  '--md-menu-container-shape': '8px',
  '--md-menu-item-container-color': 'var(--md-menu-container-color)',
  '--md-menu-item-selected-container-color': '#e8f0fe',
}

const Menu = ({
  props,
  itemProps,
  items,
  isSelected,
  handleMenu,
  handleAnchor,
  children,
}) => {
  useEffect(() => {
    const menu = document.getElementById(`${props.id}`)
    const anchor = document.getElementById(`${props.anchor}`)

    menu.onClosed = handleAnchor
    menu.addEventListener('close-menu', handleMenu)
    anchor.addEventListener('click', handleAnchor)

    return () => {
      menu.removeEventListener('close-menu', handleMenu)
      anchor.removeEventListener('click', handleAnchor)
    }
  }, [handleAnchor, handleMenu, props.anchor, props.id])

  return (
    <md-menu {...props} style={{ ...styles, ...props.style }} fixed>
      {children}
      {items.map(({ label, value }) => (
        <md-menu-item
          key={value}
          id={value}
          headline={label}
          {...((Array.isArray(isSelected)
            ? isSelected.includes(value)
            : isSelected === value) && { selected: true })}
          {...itemProps}
        ></md-menu-item>
      ))}
    </md-menu>
  )
}

export default memo(Menu)
