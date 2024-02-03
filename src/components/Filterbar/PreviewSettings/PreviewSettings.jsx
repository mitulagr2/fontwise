'use client'
import styles from './PreviewSettings.module.scss'
import { memo, useEffect, useState } from 'react'
import constants from '../../../constants'
import Input from '../../Material3/Input'
import Button from '../../Material3/Button'
import Menu from '../../Material3/Menu'
import Slider from '../../Material3/Slider'

const PreviewSettings = ({
  props: { preview_text, preview_size, dispatchDebounced },
}) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const slider = document.getElementById('preview_size_slider')
    const handleSmooth = (e) => {
      const stylehseet = document.getElementById('customStyles').sheet
      stylehseet.insertRule(
        `.displayText::before {font-size: ${e.target.value}px;}`,
        stylehseet.cssRules.length
      )
    }
    slider.addEventListener('input', handleSmooth)
    return () => slider.removeEventListener('input', handleSmooth)
  }, [])

  return (
    <>
      <div className={styles.PreviewTextField}>
        <Input
          handleInput={(e) =>
            dispatchDebounced({
              type: 'SET',
              property: 'preview_text',
              payload: e.target.value,
            })
          }
          props={{
            id: 'preview_text',
            placeholder: 'Type Something',
            value: preview_text,
            type: 'textarea',
            rows: 5,
            style: { '--md-filled-text-field-container-color': '#e8f0fe' },
          }}
        />
      </div>

      <div className={styles.FontModifier}>
        <span className="md-menu">
          <Button
            type="text"
            icon="arrow_drop_down"
            props={{
              id: 'preview_size_anchor',
              trailingIcon: true,
            }}
          >
            {preview_size + 'px'}
          </Button>
          <Menu
            isSelected={preview_size}
            handleAnchor={() => setIsOpen((prev) => !prev)}
            handleMenu={(e) =>
              dispatchDebounced({
                type: 'SET',
                property: 'preview_size',
                payload: e.detail.initiator.id,
              })
            }
            items={constants['preview_size']}
            itemProps={{
              keepOpen: true,
              keepOpenOnClick: true,
            }}
            props={{
              id: 'preview_size_menu',
              anchor: 'preview_size_anchor',
              stayOpenOnOutsideClick: true,
              stayOpenOnFocusout: true,
              style: {
                maxHeight: '176px',
                minWidth: '76px',
              },
              ...(isOpen && { open: true }),
            }}
          />
        </span>

        <Slider
          handleSlider={(e) =>
            dispatchDebounced({
              type: 'SET',
              property: 'preview_size',
              payload: e.target.value,
            })
          }
          props={{
            id: 'preview_size_slider',
            min: 8,
            max: 300,
            value: preview_size,
          }}
        />
      </div>
    </>
  )
}

export default memo(PreviewSettings)
