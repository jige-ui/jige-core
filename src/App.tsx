import type { Component } from 'solid-js'

import TestTanstackForm from './test/TestTanstackForm'
import '@unocss/reset/tailwind-compat.css'

const App: Component = () => {
  return (
    <div class="m-12">
      <TestTanstackForm />
    </div>
  )
}

export default App
