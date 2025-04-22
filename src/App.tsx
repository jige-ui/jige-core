import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestJigeForm from './test/TestJigeForm'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestJigeForm />
    </div>
  )
}

export default App
