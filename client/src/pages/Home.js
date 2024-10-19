import React from 'react'
import MessagePage from '../components/MessagePage'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div>
      Home PAge

      <section>
        <Outlet />
      </section>
    </div>
  )
}

export default Home
