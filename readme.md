# React Modern UI
React Modern UI is a small UI library created to group different components that I developped and used in different projects. It was created primarly adopting simplicity and for code reusability.

## Installation

## Components

### Button
Displays a button with styles based on role, width, roundness and avalability
#### Props
![children required](https://img.shields.io/badge/Children-Required-red)
- `role`: The role the button will take
	- type: `ButtonRoles` (enum, optional)
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

### CheckBox
Displays a checkbox with its states and with/without a label
#### Props
![no children](https://img.shields.io/badge/Children-Not_Required-green)
- `key`: Key of the Checkbox
	- type: `number | string | bigint | null` (optional)
- `label`: The label to be displayed next to the checkbox
	- type: `string` (optional)
- `isChecked`: Specifies whether the checkbox is checked or not.
	- type: `boolean` (optional)
	- default: `false`
- `isFull`: Specifies whether the checkbox has a tri-state or not.
	- type: `boolean` (optional)
	- values:
		- if not specified, the checkbox behaves normally with 2 states of checked/unchecked. 
		- if `false`, checkbox is in tri-state mode and displays a dash if `isChecked` is set to `true`, or nothing otherwise
		- if `true`, checkbox is in tri-state mode and displays a check mark if `isChecked` is set to `true`, or nothing otherwise
- `singleOption`: Specifies whether the checkbox should behave like a radiobutton or not. For this purpose, it is recommended to use a `RadioButtonsGroup`
	- type: `boolean` (optional)
- `onChange`: The change event handler to be fired when the checkbox state changes
	- type: `React.ChangeEventHandler<HTMLInputElement>`