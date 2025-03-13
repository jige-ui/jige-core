import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestTanstackForm from './test/TestForm'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestTanstackForm />
    </div>
  )
}

export default App
