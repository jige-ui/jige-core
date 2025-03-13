/* @refresh reload */
import { render } from 'solid-js/web'

/* @refresh reload */
import App from './App'
import './index.css'
import 'virtual:uno.css'
import 'uno.css'

const root = document.querySelector('#root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
	)
}

render(() => <App />, root!)
