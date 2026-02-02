import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import routes from './routes';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@jad-mlb/react-modern-ui';
import theme from './theme';
import "./i18n";
import './index.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme = {theme}>
			<RouterProvider router = {routes}/>
		</ThemeProvider>
	</StrictMode>,
)
