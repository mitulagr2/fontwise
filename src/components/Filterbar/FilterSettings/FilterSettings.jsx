'use client'
import styles from './FilterSettings.module.scss'
import { memo, useState } from 'react'
import constants from '../../../constants'
import Button from '../../Material3/Button'
import Menu from '../../Material3/Menu'
import FilterChips from '../../Material3/FilterChips'
import Slider from '../../Material3/Slider'

const FilterSettings = ({
  props: { subset, stylecount, dispatchDebounced },
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles.Subheading}>
        <md-icon>language</md-icon>
        <h4>Language</h4>
      </div>

      <div className={styles.Subset}>
        <span className="md-menu">
          <Button
            type="filled-tonal"
            icon="arrow_drop_down"
            props={{
              id: 'subset_anchor',
              trailingIcon: true,
              style: {
                '--md-filled-tonal-button-container-shape': '6px',
              },
            }}
          >
            {constants['subset'].find((a) => a.value === subset).label}
          </Button>
          <Menu
            isSelected={subset}
            handleAnchor={() => setIsOpen((prev) => !prev)}
            handleMenu={(e) =>
              dispatchDebounced({
                type: 'SET',
                property: 'subset',
                payload: e.detail.initiator.id,
              })
            }
            items={constants['subset']}
            itemProps={{
              keepOpen: true,
              keepOpenOnClick: true,
            }}
            props={{
              id: 'subset_menu',
              anchor: 'subset_anchor',
              stayOpenOnOutsideClick: true,
              stayOpenOnFocusout: true,
              style: {
                maxHeight: '448px',
                '--md-menu-item-selected-container-color': '#ffffff',
                '--md-menu-container-elevation': '5',
              },
              ...(isOpen && { open: true }),
            }}
          />
        </span>
      </div>
      {/* 
      <div className={styles.Subheading}>
        <md-icon>custom_typography</md-icon>
        <h4>Technology</h4>
      </div>
      <div className={styles.Technology}>
        {['vfonly', 'coloronly'].map((id) => (
          <FilterChips
            key={id}
            idPrefix={`filterbar_${id}_`}
            handleChip={(e) => {
              dispatchDebounced({
                type: e.target.selected ? 'UNSET' : 'SET',
                property: id,
                payload: e.target.id.replace(`filterbar_${id}_`, ''),
              })
            }}
            items={constants[id]}
            props={{ type: 'filter', 'single-select': true }}
          />
        ))}
      </div> */}

      <div className={styles.Subheading}>
        <md-icon>brush</md-icon>
        <h4>Decorative stroke</h4>
      </div>

      <div className={styles.Stroke}>
        <FilterChips
          idPrefix="filterbar_"
          handleChip={(e) => {
            dispatchDebounced({
              type: e.target.selected ? 'UNSET' : 'SET',
              property: 'stroke',
              payload: e.target.id.replace('filterbar_', ''),
            })
          }}
          items={constants['stroke']}
          props={{ type: 'filter', 'single-select': true }}
        />
      </div>

      <div className={styles.Subheading}>
        <md-icon>folder</md-icon>
        <h4>Classification</h4>
      </div>

      <div className={styles.Classification}>
        <FilterChips
          idPrefix="filterbar_"
          handleChip={(e) => {
            dispatchDebounced({
              type: e.target.selected ? 'UNSET' : 'SET',
              property: 'classification',
              payload: e.target.id.replace('filterbar_', ''),
            })
          }}
          items={constants['classification']}
          props={{ type: 'filter', 'single-select': true }}
        />
      </div>

      <div className={styles.Subheading}>
        <md-icon>linear_scale</md-icon>
        <h4>Properties</h4>
      </div>

      <div className={styles.SliderStyleCount}>
        <span>Number of styles</span>
        <Slider
          handleSlider={(e) =>
            dispatchDebounced({
              type: 'SET',
              property: 'stylecount',
              payload: e.target.value,
            })
          }
          props={{
            id: 'stylecount_slider',
            min: 1,
            max: 18,
            value: stylecount,
            style: { minInlineSize: '150px' },
          }}
        />
      </div>
    </>
  )
}

export default memo(FilterSettings)
