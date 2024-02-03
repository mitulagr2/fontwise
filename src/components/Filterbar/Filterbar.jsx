'use client'
import styles from './Filterbar.module.scss'
import { memo } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useAppState } from '../StateContext'
import PreviewSettings from './PreviewSettings/PreviewSettings'
import FilterSettings from './FilterSettings/FilterSettings'
import Button from '../Material3/Button'

const Filterbar = () => {
  const [{ preview_text, preview_size, subset, stylecount }, dispatch] =
    useAppState()

  const dispatchDebounced = useDebouncedCallback(dispatch, 800)

  return (
    <div
      className={styles.Filterbar}
      style={{ height: window.innerHeight - 80 }}
    >
      <div className={styles.ResetBtn}>
        <Button
          type="text"
          icon="refresh"
          handleBtn={() => dispatchDebounced({ type: 'RESET', payload: {} })}
          props={{
            id: 'filterbar_refresh',
            toggle: true,
          }}
        >
          Reset all
        </Button>
      </div>

      <h4 className={styles.Heading}>Preview</h4>

      <PreviewSettings
        props={{ preview_size, preview_text, dispatchDebounced }}
      />

      <div className={styles.HorizontalDivider}></div>

      <h4 className={styles.Heading}>Filter</h4>

      <FilterSettings
        props={{
          subset,
          stylecount,
          dispatchDebounced,
        }}
      />
    </div>
  )
}

export default memo(Filterbar)
