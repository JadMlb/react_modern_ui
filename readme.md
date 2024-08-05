# React Modern UI
React Modern UI is a small UI library created to group different components that I developped and used in different projects. It was created primarly adopting simplicity and for code reusability.

## Installation

## Components

### Button
Displays a button with styles based on role, width, roundness and avalability
#### Props
![children required](https://img.shields.io/badge/Children-Required-red)
- `role`: The role the button will take
	- type: `ButtonRoles` (enum)
	- values:
		- `normal` (default): renders a button with gray background
		- `primary`: renders a button with primary colour in its background
		- `transparent`: renders a button with no background
		- `alert`: renders a gray button that turns red on hover
		- `warn`: renders a red button
- `wide`: Specifies if the button should occupy 100% of its parent
	- type: `boolean` (optional)
	- default: `false`
- `rounded`: Specifies if the button should be rounded. In this case content is centered and button will be 30px*30px.
	- type: `boolean` (optional)
	- default: `false`
- `onClick`: Callback function to be executed on button click
	- type: `React.MouseEventHandler<HTMLButtonElement>`
- `disabled`: Specified if the button is disabled or not.
	- type: `boolean`
	- default: `false`