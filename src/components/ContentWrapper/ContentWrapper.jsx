'use client'
import { lazy, memo, useDeferredValue } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useAppState } from '../StateContext'
import { initialFilter } from '../../constants'

const AddFontDialog = lazy(() => import('../AddFontDialog/AddFontDialog'))
const FontList = lazy(() => import('../FontList/FontList'))

const ContentWrapper = () => {
  const [
    { tab, preview_text, sortBy, subset, query, stroke, classification },
    dispatch,
  ] = useAppState()

  const dispatchDebounced = useDebouncedCallback(dispatch, 800)

  const deferredTab = useDeferredValue(tab)

  return (
    <>
      {deferredTab === 'add' && (
        <AddFontDialog
          preview_text={preview_text}
          dispatchDebounced={dispatchDebounced}
        />
      )}
      <FontList
        key={deferredTab === 'add' ? initialFilter['tab'] : deferredTab}
        tab={deferredTab === 'add' ? initialFilter['tab'] : deferredTab}
        filters={{
          sortBy,
          subset,
          query,
          stroke,
          classification,
        }}
      />
    </>
  )
}

export default memo(ContentWrapper)
