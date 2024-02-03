'use client'
import styles from './Body.module.scss'
import { Fragment, memo, useEffect, useState } from 'react'
import constants from '../../../constants'
import Input from '../../Material3/Input'
import Menu from '../../Material3/Menu'
import FilterChips from '../../Material3/FilterChips'
import Button from '../../Material3/Button'

const inputs1 = [['family', 'Family']]
const inputs2 = [
  [
    'contributor',
    'Email',
    // eslint-disable-next-line no-useless-escape
    { type: 'email', pattern: '.+@gmail\.com' }, //prettier-ignore
  ],
  ['contributorLink', 'Website', { type: 'url', pattern: 'https://.*' }],
  ['preview_text', 'Preview'],
]
const menus = [
  ['subset', 'Included subsets'],
  ['variants', 'Included variants'],
]
const chips = [
  ['stroke', 'Decorative stroke'],
  ['classification', 'Classification'],
]
const icons = ['upload']

const Body = ({ data, handleChange }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(
    menus.reduce((obj, [id]) => ({ ...obj, [id]: false }), {})
  )

  useEffect(() => {
    const updateFontPreview = ({ target: { files } }) => {
      if (!files[0].type.includes('font')) return
      // console.log(`Invalid file type`)

      const date = new Date(files[0].lastModified)
      const month = date.getMonth() + 1 + ''
      const lastModified = `${date.getFullYear()}-${
        month.length < 2 ? '0' + month : month
      }-${date.getDate()}`

      // console.log(files[0])
      const reader = new FileReader()

      reader.onload = ({ target: { result } }) => {
        handleChange('file', result)
        handleChange('lastModified', lastModified)

        document.documentElement.style.setProperty(
          '--preview_text',
          `'${files[0].name} uploaded successfully'`
        )

        document
          .getElementById('dialog_preview_text')
          .shadowRoot.childNodes[2].querySelector('textarea').style.fontFamily =
          'Preview'

        const stylesheet = document.getElementById('customStyles').sheet
        stylesheet.insertRule(
          `@font-face {font-family: 'Preview';src:url('${result}');}`,
          stylesheet.cssRules.length
        )
      }
      reader.readAsDataURL(files[0])
    }

    const fileInput = document.getElementById('dialog_file_input')

    fileInput.addEventListener('change', updateFontPreview)

    return () => fileInput.removeEventListener('change', updateFontPreview)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.Body}>
      {inputs1.map(([id, text]) => (
        <Input
          key={'dialog_' + id}
          handleInput={(e) => handleChange(id, e.target.value)}
          props={{
            id: 'dialog_' + id,
            label: text,
            value: data.current[id],
          }}
        />
      ))}

      {menus.map(([id, text]) => (
        <span className="md-menu" key={`dialog_${id}_menu`}>
          <Button
            type="text"
            icon="arrow_drop_down"
            props={{ id: `dialog_${id}_anchor`, trailingIcon: true }}
          >
            {text}
          </Button>
          <Menu
            isSelected={data.current[id]}
            handleAnchor={() =>
              setIsOpenMenu((prev) => ({ ...prev, [id]: !prev[id] }))
            }
            handleMenu={(e) => {
              const value = e.detail.initiator.id
              handleChange(
                id,
                data.current[id].includes(value)
                  ? data.current[id].filter((f) => f !== value)
                  : [...data.current[id], value]
              )
            }}
            items={id === 'subset' ? constants[id].slice(1) : constants[id]}
            itemProps={{
              keepOpen: true,
              keepOpenOnClick: true,
            }}
            props={{
              id: `dialog_${id}_menu`,
              anchor: `dialog_${id}_anchor`,
              stayOpenOnOutsideClick: true,
              stayOpenOnFocusout: true,
              style: { maxHeight: '200px' },
              ...(isOpenMenu[id] && { open: true }),
            }}
          />
        </span>
      ))}

      {chips.map(([id, text]) => (
        <Fragment key={id}>
          <h4>{text}</h4>
          <FilterChips
            idPrefix="dialog_"
            handleChip={(e) =>
              handleChange(id, e.target.id.replace('dialog_', ''))
            }
            items={constants[id]}
            props={{ type: 'filter', 'single-select': true }}
          />
        </Fragment>
      ))}

      <input id="dialog_file_input" type="file" style={{ display: 'none' }} />

      <div>
        {icons.map((name) => (
          <Button
            key={'dialog_' + name}
            type="icon"
            icon={name}
            handleBtn={() =>
              document.getElementById('dialog_file_input').click()
            }
            props={{
              id: 'dialog_' + name,
              toggle: true,
            }}
          />
        ))}
        <span className={styles.UploadText}></span>
      </div>

      {inputs2.map(([id, text, extraProps]) => (
        <Input
          key={'dialog_' + id}
          handleInput={(e) => handleChange(id, e.target.value)}
          props={{
            id: 'dialog_' + id,
            label: text,
            value: data.current[id],
            ...extraProps,
            ...(id === 'preview_text' && {
              type: 'textarea',
              rows: 3,
            }),
          }}
        />
      ))}
    </div>
  )
}

export default memo(Body)
