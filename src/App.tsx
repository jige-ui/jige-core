import type { Component } from 'solid-js'

import TestFloatingUI from './test/TestFloatingUI'
import '@unocss/reset/tailwind-compat.css'

const App: Component = () => {
  return (
    <div class="m-12">
      <TestFloatingUI />
    </div>
  )
}

export default App
