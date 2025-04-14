import type { Component } from 'solid-js'
import '@unocss/reset/tailwind-compat.css'
import TestTable from './test/TestTable'

const App: Component = () => {
  return (
    <div class='m-12'>
      <TestTable />
    </div>
  )
}

export default App
