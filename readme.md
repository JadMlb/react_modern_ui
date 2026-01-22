# React Modern UI
React Modern UI is a small UI library created to group different components that I developped and used in different projects. It was created primarly adopting simplicity and for code reusability.

## Installation

```bash
npm install @jad-mlb/react-modern-ui
yarn install @jad-mlb/react-modern-ui
```

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
To use a custom theme you need to refer to the `createTheme` function, which initializes the theme with your defined values. This function:
- allows you to define:
	- custom theme colours
	- custom theme spacing and radii values
	- default component props
	- default component styles
- returns the custom theme, which needs to be passed to `ThemeProvider`
1. Import and call `createTheme` utility on the same level as `ThemeProvider`.
```jsx
import { createTheme } from 'react-modern-ui';
```
```jsx
const theme = createTheme ({
	mode: ...
	measurements: ...
	colours: ...
	overrides: ...
});
```

### Updating the theme
1. Import and call `useTheme` hook. This hook returns an object with 2 attributes: `theme` (the current theme) and `dispatch` (the function that is used to change this theme).
2. Use the dispatch function to change the values of the theme. `dispatch` takes in its arguments an object with a `type` attribute, which can take only 2 values:
	- `reset`: will reset the theme back to the default values
	- `set`: will set the theme as wanted. For this purpose, an additional attribute `values` is used. The `values` attribute resembles [`ThemeType`](docs.md#themetype), except that its different attributes are optional, so that you can set any value you want.
	```jsx
	dispatch({type: "set", {mode: "dark"}}) // turns on dark mode
	```
	```jsx
	dispatch({type: "set", {primary: {medium: "ffff00"}}}) // sets primary colour to #ffff00
	```

## Documentation
Click [here](docs.md) to read the full docs.

## Change Log

### v2.0.0 is in beta 13
Check the [change log](changelog.md#v200-beta13) to see what will change in the upcoming major version.

### v1.1.0 is out
Check the [change log](changelog.md#v110) to see everything new