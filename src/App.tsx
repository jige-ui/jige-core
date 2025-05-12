import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestTabs from './test/TestTabs'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestTabs />
    </div>
  )
}

export default App
