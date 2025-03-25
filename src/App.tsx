import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestModal from './test/TestModal'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestModal />
    </div>
  )
}

export default App
