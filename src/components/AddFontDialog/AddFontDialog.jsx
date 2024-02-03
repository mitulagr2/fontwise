'use client'
import { memo, useCallback, useMemo, useRef } from 'react'
import { useThrottledCallback } from 'use-debounce'
import { createFont } from '../FontService'
import { preview_type } from '../../constants'
import Actions from './Actions/Actions'
import Body from './Body/Body'
import Dialog from '../Material3/Dialog'

const formProperties = [
  'family',
  'variants',
  'subsets',
  'stroke',
  'classification',
  'file',
  'lastModified',
  'contributor',
  'contributorLink',
]

const AddFontDialog = ({ preview_text, dispatchDebounced }) => {
  const initialData = useMemo(
    () => ({
      family: '',
      variants: ['regular'],
      subset: [],
      stroke: '',
      classification: '',
      contributor: '',
      contributorLink: '',
      file: '',
      // category: ['serif'],
      preview_text: preview_text || preview_type['sentence'],
    }),
    [preview_text]
  )

  const data = useRef(initialData)
  const key = useRef(0)

  const handleChangeForm = useCallback((property, value) => {
    property = property.replace('_', '.')
    data.current = {
      ...data.current,
      [property]: value,
    }
  }, [])

  const handleSubmit = useCallback(() => {
    // console.log('submitting font')
    const font = {}
    formProperties.forEach((property) => {
      console.log(property, data.current)
      if (
        property === 'subsets'
          ? data.current['subset'].length > 0
          : data.current[property]
      )
        font[property] = data.current[property]
      else {
        return
        // console.log('missing values')
      }
    })
    font.category = font.stroke || font.classification
    createFont(font).then(() => {
      // console.log('added font')
      data.current = initialData
      dispatchDebounced({ type: 'UNSET', property: 'tab' })
    })
  }, [data, dispatchDebounced, initialData])

  const throttledSubmit = useThrottledCallback(handleSubmit, 4000, {
    trailing: false,
  })

  return (
    <>
      <Dialog
        key={key.current++}
        headline="Add Font"
        actions={<Actions />}
        handleClose={(e) => {
          const dialog = document.getElementById('dialog')
          dialog.returnValue === 'cancel' || e.preventDefault()
          dialog.returnValue === 'submit' && throttledSubmit()
        }}
        handleToggle={() =>
          dispatchDebounced({ type: 'UNSET', property: 'tab' })
        }
        props={{ id: 'dialog', open: true }}
      >
        <Body data={data} handleChange={handleChangeForm} />
      </Dialog>
    </>
  )
}

export default memo(AddFontDialog)
