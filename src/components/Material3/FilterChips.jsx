'use client'
import { memo, useEffect } from 'react'
import '@material/web/chips/chip-set.js'
import '@material/web/chips/filter-chip.js'

const styles = {
  '--md-filter-chip-container-color': '#e8f0fe',
  '--md-filter-chip-outline-width': '0px',
  // '--md-filter-chip-focus-state-layer-color': '#3c4043',
  '--md-filter-chip-label-text-color': '#3c4043',
}

const FilterChips = ({
  idPrefix,
  items,
  props,
  itemProps,
  handleChip,
  children,
}) => {
  useEffect(() => {
    let chipItems = items.map(({ value }) => {
      const item = document.getElementById(idPrefix + value)
      item.addEventListener('click', handleChip)
      return item
    })

    return () =>
      chipItems.forEach((c) => c.removeEventListener('click', handleChip))
  }, [handleChip, idPrefix, items])

  return (
    <md-chip-set {...props} style={{ ...styles, ...props.style }}>
      {children}
      {items.map(({ label, value }) => (
        <md-filter-chip
          id={idPrefix + value}
          key={value}
          label={label}
          {...itemProps}
          style={{ background: 'var(--md-filter-chip-container-color)' }}
        ></md-filter-chip>
      ))}
    </md-chip-set>
  )
}

export default memo(FilterChips)
