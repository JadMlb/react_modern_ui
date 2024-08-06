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

### ComboBox
Renders a ComboBox, i.e. a drop-down list of options to select one or more options. The list of options is passed via the property `from`.
#### Props
![no children](https://img.shields.io/badge/Children-Not_Required-green)
- `key`: Key of the ComboBox
	- type: `string | number | bigint | null` (optional)
- `label`: The label to be displayed inside of the selection panel
	- type: `string` (optional)
- `name`: The name of the field that contains the value of this selection. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized. 
	- type: `string`
- `from`: The list of options to offer for selection
	- type: `Option[]`
	- `Option`:
		- attributes:
			- `id`: The id of the option
				- type: `number`
			- `text`: The text to be displayed for that option
				- type: `string`
- `values`: The active selected values, represented by a list of their IDs. Even if multiple choices is not enabled, the values should be in an array.
	- type: `number[]`
- `onChange`: The change event handler fired when a new value is selected. It exposes all of the selected options so they can be displayed.
	- type: `(options: Option[]) => void`
	- parameters:
		- `options`: The list of all currently selected options
- `multiple`: Specifies whether the ComboBox is in multiple selection mode, supporting multiple options.
	- type: `boolean` (optional)
	- default: `false`
- `notSearchable`: Hides the search bar in the options list.
	- type: `boolean` (optional)
	- default: `false`
- `compact`: Hides the label of the ComboBox.
	- type: `boolean` (optional)
	- default: `false`
- `defaultFirst`: Automatically selects the first option in the options list and fires the event handler.
	- type: `boolean` (optional)
	- default: `false`
- `required`: Specifies whether the value of the ComboBox is required and hides the clear button upon selection.
	- type: `boolean` (optional)
	- default: `false`