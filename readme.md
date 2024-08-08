# React Modern UI
React Modern UI is a small UI library created to group different components that I developped and used in different projects. It was created primarly adopting simplicity and for code reusability.

## Installation

## Usage
### Getting started
1. Wrap your application in the `ThemeProvider` component, even if you don't want to use custom themes. `ThemeProvider` is important to get all of the colours of the different components.
```jsx
// ... other imports ...
import { ThemeProvider } from 'react-modern-ui/theme';
// ...
  // other components
    <ThemeProvider>
      <App/>
    </ThemeProvider>
  // closing tags
```
2. Import your favourite components anywhere inside your application

### Using custom theme
To use a custom theme you need to define some values for some (or all) of the following types of colours used throughout the components.
1. Import and call `useTheme` hook. This hook returns an object with 2 attributes: `theme` which is the current theme and `dispatch`, the function that is used to change this theme.
```jsx
import { useTheme } from 'react-modern-ui/theme';
```
```jsx
const {theme, dispatch} = useTheme();
```
2. Use the dispatch function to change the values of your colours. `dispatch` takes in its arguments an object with a `type` attribute, which can take only 2 values:
	- `reset`: will reset the theme back to the default values
	- `set`: will set the theme as wanted. For this purpose, an additional attribute `values` is used. The `values` attribute resembles [`ThemeType`](docs.md#themetype), except that its different attributes are optional, so that you can set any value you want.
	```jsx
	dispatch({type: "set", {mode: "dark"}}) // turns on dark mode
	```
	```jsx
	dispatch({type: "set", {primary: {medium: "ffff00"}}}) // turns on dark mode
	```

## Documentation
Click [here](docs.md) to read the full docs.