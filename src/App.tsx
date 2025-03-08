import type { Component } from 'solid-js'

import TestForm from './test/TestForm'
import '@unocss/reset/tailwind-compat.css'

const App: Component = () => {
  return (
    <div class="m-12">
      <TestForm />
    </div>
  )
}

export default App
