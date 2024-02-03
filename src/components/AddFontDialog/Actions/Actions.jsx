'use client'
import { memo } from 'react'
import Button from '../../Material3/Button'

const Actions = () => {
  return (
    <>
      <Button type="text" props={{ form: 'form-id', value: 'cancel' }}>
        Back
      </Button>
      <Button type="text" props={{ form: 'form-id', value: 'submit' }}>
        Submit Font
      </Button>
    </>
  )
}

export default memo(Actions)
