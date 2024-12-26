import type { Component } from 'solid-js'

import TestTabs from './test/TestTabs'
import '@unocss/reset/tailwind-compat.css'

const App: Component = () => {
  return (
    <div class="m-12">
      <TestTabs />
    </div>
  )
}

export default App
