import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestFloatingUI from './test/TestFloatingUI'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestFloatingUI />
    </div>
  )
}

export default App
