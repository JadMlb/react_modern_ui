# Combobox

A combobox is an element that shows a dropdown of options from which the user can choose.

> [!TAG]
> 
> *Since* 1.0.0

> [!PANEL]
> 
> ## Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | value | `string \| string[]` | x | undefined | The value of the current selection. If the value is an array, the combobox is in multi-selection mode. |
> | options | `Option[] \| {[category: string]: Option[]}` | ✓ | - | The options to display in the popup menu
> | menuProps | `MenuConfigProps` | x | undefined | Props that can be forwarded to the popup menu to customise the position and direction
> | arrowComponent | `Partial <ComboboxArrow>` | x | The default chevron component | The arrow component that appears as the trailing of the combobox, changing based on the state (open / closed)
> | defaultArowComponentColour | `string` | x | undefined | The default arrow component's colour
> | renderOption | `(option: Option, selected?: boolean, onClick?: OnChangeFunction <Option>) => void` | x | A function that returns the default option component | Customises how the options are rendered
>
> ### Shared props
> - `[!ARIA]`
> - `[!MUTABLE]`
> - `[!NO-CHILDREN]`
> - `CommonInputProps`

## Options
In order to define the set of options the user can select, the `options` prop accepts a set of `Option` objects. Each `Option` has a `value` which is used to identify this option and a `display` which is what the user will see.

```ts
type Option = {
	value: string,
	display: string
};
```

Combobox's `options` can be an array or a categorised set of options.

### Array
```ts
///combobox-options-array-demo///
import type { Option } from "@jad-mlb/react-modern-ui";
const options: Option[] = [
	{
		value: "a",
		display: "A"
	},
	{
		value: "b",
		display: "B"
	},
	{
		value: "c",
		display: "C"
	},
	{
		value: "d",
		display: "D"
	},
];
```

### Categories
```ts
///combobox-options-categories-demo///
import type { ComboboxProps } from "@jad-mlb/react-modern-ui";

const options: ComboboxProps["options"] = {
	"Vegetables": [
		{value: "aubergine", display: "Aubergine/Eggplant"},
		{value: "beet", display: "Beetroot"},
		{value: "carrot", display: "Carrot"},
		{value: "peas", display: "Peas"},
	],
	"Fruit": [
		{value: "banana", display: "Banana"},
		{value: "fig", display: "Fig"},
		{value: "kiwi", display: "Kiwi"},
		{value: "orange", display: "Orange"},
	]
};
```

> **! Note**
>
> Even with categories, the change handler implementation and the value fetching do not change

## Value
A combobox can operate in 2 selection modes:
- single selection
- multi-selection

Multi-selection happens when the `value` prop is a string array of the values of the selected options.

```ts
///combobox-values-demo///
// single selection handler
const [value, setValue] = useState ("");
const handleChange = useCallback (
	(_: React.ChangeEvent | null, option: Option) =>
	{
		setValue (option.value);
	},
	[setValue]
);

// multi-selection handler
const [values, setValues] = useState<string[]> ([]);
const handleMultiSelectionChange = useCallback (
	(_: React.ChangeEvent | null, option: Option) =>
	{
		setValues (
			old =>
			{
				if (!option)
					return [];
				else if (old.findIndex (o => o === option.value) > -1)
					return old.filter (v => v !== option.value);
				return [...old, option.value];
			}
		);
	},
	[setValues]
);
```

> **! Note**
>
> The `optional` flag prop enables a clear button to the combobox. When the clear button is clicked, the event handler's arguments (the change event and the new value/option) are null. Make sure to handle the null case to avoid bugs and errors in your code.

## Customisations
### Arrow
The arrow component, i.e. the chevron on the left side of the combobox, indicating whether the combobox is open or closed, can be customised.

#### Base shape
You can keep the base chevron and customize its colour using the `defaultArrowComponentColour` which accepts a string representing the css definition or a theme colour key.

```tsx
///combobox-default-arrow-colour-demo///
import { Combobox, Input, type Option } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

const options: Option[] = [
	{
		value: "a",
		display: "A"
	},
	{
		value: "b",
		display: "B"
	},
	{
		value: "c",
		display: "C"
	},
	{
		value: "d",
		display: "D"
	},
];

export default function ComboboxDefaultArrowColourDemo ()
{
	const [value, setValue] = useState ("");
	const [colour, setColour] = useState<string>();
	
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, option: Option) =>
		{
			setValue (option.value);
		},
		[setValue]
	);
	
	const handleColourChange = useCallback (
		(_: React.ChangeEvent | null, value: string | null) =>
		{
			setColour (value ?? undefined);
		},
		[setColour]
	);

	return (
		<>
			<Input
				type = "text"
				value = {colour ?? ""}
				onChange = {handleColourChange}
				optional
				label = "Enter the colour you want"
				hint = "rgb(255, 0, 0), blue, primary, etc."
			/>
			<Combobox
				label = "Select a value..."
				value = {value}
				options = {options}
				onChange = {handleChange}
				defaultArrowComponentColour = {colour}
			/>
		</>
	);
}
```

#### Component
If you would like to, the entire component can be overridable and rendered as you wish it to be.

This prop is partial, meaning that you can override the arrow when the combobox is open or closed or both.

```tsx
///combobox-arrow-demo///
<Combobox
	// ... other props
	arrowComponent = {{
		closed: "😌",
		open: "🤗"
	}}
/>
```

> **! Note**
>
> The contents of the arrow definition can be any component that React can render (i.e. `React.ReactNode`)

### Options
The rendered options in the popup menu can be customized using the `renderOption` function.

```tsx
///combobox-render-option-demo///
function renderOption (option: Option, selected?: boolean, onClick?: OnChangeFunction<Option>)
{
	return (
		<div onClick = {() => onClick?. (null, option)}>
			{selected && "✅ "}
			<strong>{option.display}</strong>
		</div>
	);
}
```

> **! Note**
>
> You need to pass the onClick function in `renderOption` to enable clicking and selection.

> **! Note**
>
> Due to type mismatches in `renderOption`, as well as the absence of a semantic html component behind `Combobox`, the event in combobox's `onChange` is always null. This might change in the future.

### Popup
The popup is a `Menu` component and inherits its props. Other than the styles of the menu, its position and direction can be cutomised.

For more details check the documentation for `Menu`.

> **TL;DR**
>
> - `position` controls the origin of the menu on the anchor element
> - `direction` controls where that origin point is positioned on the menu, however this value is the opposite of `direction`. In other words, `direction` defines in which direction starting from the origin point would the menu emerge.

```tsx
///combobox-menu-demo///
// this is one example
<Combobox
	// ... other props
	menuProps = {{
		position: {
			horizontal: "left"
		},
		direction: {
			vertical: "bottom",
			horizontal: "right"
		}
	}}
/>
```