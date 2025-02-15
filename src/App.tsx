import type { Component } from 'solid-js'

import TestModal from './test/TestModal'
import '@unocss/reset/tailwind-compat.css'

const App: Component = () => {
  return (
    <div class="m-12">
      <TestModal />
    </div>
  )
}

export default App
