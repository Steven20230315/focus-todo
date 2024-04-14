import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import App2 from './App2.tsx';
import './index.css';
import { GlobalStyles } from './components/styles/GlobalStyles.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalStyles />
		{/* <App /> */}
		<App2/>
	</React.StrictMode>
);
