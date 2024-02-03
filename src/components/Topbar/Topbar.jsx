'use client'
import styles from './Topbar.module.scss'
import { memo, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useAppState } from '../StateContext'
import constants from '../../constants'
import Input from '../Material3/Input'
import Menu from '../Material3/Menu'
import Button from '../Material3/Button'

const Topbar = () => {
  const [{ query, sortBy }, dispatch] = useAppState()

  const dispatchDebounced = useDebouncedCallback(dispatch, 800)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={styles.Topbar}>
      <div>
        <img className={styles.Icon} src="/favicon.svg" alt="favicon" />

        <div className={styles.Search}>
          <Input
            handleInput={(e) =>
              dispatchDebounced({
                type: 'SET',
                property: 'query',
                payload: e.target.value,
              })
            }
            props={{
              id: 'query',
              placeholder: 'Search fonts',
              value: query,
              style: {
                '--md-filled-text-field-container-shape': '48px',
                '--md-filled-text-field-container-height': '56px',
                '--md-filled-text-field-container-shape-start-end': '0px',
                '--md-filled-text-field-container-shape-end-end': '0px',
              },
              hasLeadingIcon: true,
            }}
          >
            <md-icon slot="leadingicon">search</md-icon>
          </Input>
        </div>

        <span className="md-menu">
          <Button
            type="filled-tonal"
            icon="arrow_drop_down"
            props={{
              id: 'sortBy_anchor',
              trailingIcon: true,
              style: {
                '--md-filled-tonal-button-container-height': '56px',
                '--md-filled-tonal-button-container-shape-start-start': '0px',
                '--md-filled-tonal-button-container-shape-end-start': '0px',
                '--md-filled-tonal-button-hover-label-text-color': '#1a73e8',
              },
            }}
          >
            Sort by: {constants['sortBy'].find((a) => a.value === sortBy).label}
          </Button>
          <Menu
            isSelected={sortBy}
            handleAnchor={() => setIsOpen((prev) => !prev)}
            handleMenu={(e) =>
              dispatchDebounced({
                type: 'SET',
                property: 'sortBy',
                payload: e.detail.initiator.id,
              })
            }
            items={constants['sortBy']}
            itemProps={{
              keepOpen: true,
              keepOpenOnClick: true,
            }}
            props={{
              id: 'sortBy_menu',
              anchor: 'sortBy_anchor',
              stayOpenOnOutsideClick: true,
              stayOpenOnFocusout: true,
              style: { maxHeight: '208px', minWidth: '122px' },
              ...(isOpen && { open: true }),
            }}
          />
        </span>
      </div>
    </div>
  )
}

export default memo(Topbar)
