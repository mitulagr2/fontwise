'use client'
import styles from './HomePage.module.scss'
import { Suspense, lazy } from 'react'

import '@material/web/icon/icon.js'
import '@material/web/ripple/ripple.js'
import '@material/web/divider/divider.js'

import LinearProgress from '../Material3/LinearProgress'

const StateProvider = lazy(() => import('../StateContext'))
const Sidebar = lazy(() => import('../Sidebar/Sidebar'))
const Filterbar = lazy(() => import('../Filterbar/Filterbar'))
const Topbar = lazy(() => import('../Topbar/Topbar'))
const ContentWrapper = lazy(() => import('../ContentWrapper/ContentWrapper'))

const HomePage = () => {
  // const [, startTransition] = useTransition()

  return (
    <>
      <style id="customStyles"></style>
      <StateProvider>
        <Suspense revealOrder="forwards" fallback={<LinearProgress />}>
          <div className={styles.HomePage}>
            <div>
              <Sidebar />
              <Filterbar />
            </div>
            <div className={styles.RightHalf}>
              <Topbar />
              <ContentWrapper />
            </div>
          </div>
        </Suspense>
      </StateProvider>
    </>
  )
}

export default HomePage
