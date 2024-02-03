'use client'
import styles from './Sidebar.module.scss'
import { memo } from 'react'
import { useAppState } from '../StateContext'
import Button from '../Material3/Button'

const icons = [
  ['font_download', 'Fonts'],
  ['bookmarks', 'Bookmarks'],
  ['add', 'Add Font'],
]

const Sidebar = () => {
  const [{ tab }, dispatch] = useAppState()

  return (
    <div className={styles.Sidebar}>
      {icons.map(([id, text]) => (
        <div
          key={'sidebar_' + id}
          className={styles.tabIcon}
          {...(tab === id && {
            'data-selected': 'true',
          })}
        >
          <span>
            <Button
              type="icon"
              icon={id}
              handleBtn={() =>
                dispatch({ type: 'SET', property: 'tab', payload: id })
              }
              props={{
                id: 'sidebar_' + id,
                toggle: true,
                ...(tab === id && {
                  selected: true,
                }),
              }}
            />
          </span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  )
}

export default memo(Sidebar)
