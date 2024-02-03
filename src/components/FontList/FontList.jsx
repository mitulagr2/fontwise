'use client'
import styles from './FontList.module.scss'
import { lazy, memo, useCallback, useEffect, useRef, useState } from 'react'
import { getFonts, renderFonts } from '../FontService'
// import InfiniteScroll from 'react-infinite-scroll-component'
import LinearProgress from '../Material3/LinearProgress'

const InfiniteScroll = lazy(() => import('react-infinite-scroll-component'))
// const InfiniteScrollMemoized = memo(InfiniteScroll)
const FontCard = lazy(() => import('../FontCard/FontCard'))

const FontList = ({ tab, filters }) => {
  const [list, setList] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const localList = useRef(JSON.parse(localStorage.bookmark ?? '[]'))
  const page = useRef(0)
  const prefetch = useRef([])
  // const deferredList = useDeferredValue(list)

  const loadMoreItems = useCallback(
    async () => {
      let data
      if (tab === 'bookmarks') {
        const filtered = localList.current
          .filter(
            (f) =>
              (filters.subset === 'all' ||
                f.subsets.includes(filters.subset)) &&
              new RegExp(
                '^' + filters.query.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&'),
                'i'
              ).test(f.family) &&
              f.category.includes(filters.stroke) &&
              f.category.includes(filters.classification)
          )
          .sort((a, b) =>
            filters.sortBy === 'family'
              ? a[filters.sortBy].localeCompare(b[filters.sortBy], undefined, {
                  sensitivity: 'base',
                })
              : filters.sortBy === 'popularity'
              ? b[filters.sortBy] || 0 - a[filters.sortBy] || 0
              : b[filters.sortBy].localeCompare(a[filters.sortBy])
          )

        data = filtered.slice(page.current * 20, ++page.current * 20)
      } else {
        const response = await getFonts({ ...filters, page: ++page.current })
        if (response.fonts) {
          data = response.fonts
        } else {
          // console.log(response.error)
        }
      }

      if (data && data.length > 0) {
        renderFonts(data)
        document.fonts.ready.then(() => {
          setList(() => {
            const more = [...prefetch.current, ...data]
            prefetch.current = more
            return more.reduce(
              (arr, cur, idx) => [
                ...arr,
                <FontCard key={idx} font={cur} localList={localList} />,
              ],
              []
            )
          })
        })
      } else if (page.current > 1) setHasMore(false)
      else {
        // metadata autocomplete
        setList(() => [<h2 key="no_items">Nothing...</h2>])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // tab,
      localList,
      filters.sortBy,
      filters.subset,
      filters.query,
      filters.stroke,
      filters.classification,
    ]
  )

  useEffect(() => {
    if (page.current > 0) {
      prefetch.current = []
      page.current = 0
    }
    loadMoreItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.sortBy,
    filters.subset,
    filters.query,
    filters.stroke,
    filters.classification,
  ])

  // const deferredProps = useDeferredValue({
  //   list,
  //   loadMoreItems,
  //   hasMore,
  // })

  return (
    <div
      id="scrollableDiv"
      className={styles.ScrollableDiv}
      style={{
        width: window.innerWidth - 416,
        height: window.innerHeight, // window resize dynamic
      }}
    >
      <InfiniteScroll
        height="100%"
        useWindow={false} //remove?
        // getScrollParent={() => document.getElementById('scrollableDiv')} //remove?
        dataLength={list.length}
        next={loadMoreItems}
        hasMore={hasMore}
        loader={
          <LinearProgress
            style={{ '--md-linear-progress-track-shape': '8px' }}
          />
        }
        scrollableTarget="scrollableDiv"
        endMessage={<p style={{ height: '200px' }}></p>}
      >
        {list}
      </InfiniteScroll>
    </div>
  )
}

export default memo(FontList)
