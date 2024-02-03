'use client'
import styles from './FontCard.module.scss'
import { memo, useCallback, useEffect } from 'react'
import Button from '../Material3/Button'

// https://stackoverflow.com/questions/54963248/whats-the-difference-between-usecallback-and-usememo-in-practice
const icons = ['share', 'download', 'bookmark']

const FontCard = ({ font, localList }) => {
  const withUndersc = font.family.replace(' ', '_')
  const withPlus = font.family.replace(' ', '+')

  const handleChange = useCallback(
    (property, value) => {
      switch (property) {
        case 'share':
          const { origin, pathname } = window.location
          const fontUrl = origin + pathname + '?query=' + withPlus
          // navigator.permissions
          //   .query({ name: 'clipboard-write' })
          //   .then((result) => {
          //     if (result.state === 'granted' || result.state === 'prompt') {
          navigator.clipboard.writeText(fontUrl).then(
            () => {
              // console.log('copy success') // show popup?
            },
            () => {
              // console.log('copy fail')
            }
          )
          //   }
          // })
          break
        case 'bookmark':
          localList.current = value
            ? [...localList.current, font]
            : localList.current.filter((f) => f.family !== font.family)
          localStorage.bookmark = JSON.stringify(localList.current)
          break
        default:
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useEffect(() => {
    if (font.file) {
      const downloadBtn = document.getElementById(withUndersc + 'download')
      customElements.whenDefined(downloadBtn.localName).then(
        () =>
          // console.log(
          downloadBtn.shadowRoot.childNodes[1]
            .querySelector('a')
            .setAttribute(
              'download',
              withUndersc + '.' + font.file.slice(10, font.file.indexOf(';'))
            )
        // )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.FontCard}>
        <md-ripple style={{ zIndex: 1 }}></md-ripple>
        <div>
          <div className={styles.FontInfo}>
            <h4>{font.family}</h4>
            <p>
              {font.variants.length > 1
                ? `${font.variants.length} styles`
                : `${font.variants.length} style`}
            </p>
            <span className={styles.VerticalDivider}></span>
            <a href={font.contributorLink}>{font.contributor}</a>
          </div>
          <div className={styles.FontActions}>
            {icons.map((name) => (
              <Button
                key={name}
                type="icon"
                icon={name}
                handleBtn={(e) => handleChange(name, e.target.selected)}
                props={{
                  id: withUndersc + name,
                  toggle: true,
                  ...(localList.current.some(
                    ({ family }) => family === font.family
                  ) && {
                    selected: true,
                  }),
                  ...(name === 'share' && {
                    title: 'Copy URL',
                  }),
                  ...(name === 'download' && {
                    href:
                      font.file ??
                      'https://fonts.google.com/specimen/' + withPlus,
                  }),
                  style: { '--md-icon-button-icon-size': '21px' },
                }}
              />
            ))}
          </div>
        </div>
        {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
        <div style={{ fontFamily: font.family }} className="displayText"></div>
      </div>
      <md-divider inset></md-divider>
    </>
  )
}

export default memo(FontCard)
