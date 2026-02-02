import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import routes from './routes';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@jad-mlb/react-modern-ui';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider>
			<RouterProvider router = {routes}/>
		</ThemeProvider>
	</StrictMode>,
)
