import React from 'react';
import ReactDOM from 'react-dom/client';

// Components
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement !== null) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	);
} else {
	console.error("Root element with id 'root' not found");
}
