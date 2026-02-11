# CheckBox

Displays a checkbox which supports 3 states as well as the usual 2 state functionnality. A checkbox is an optional input component, i.e. when multiple options are present as checkboxes, a user can not make a choice and leave the checkboxes empty.

> [!TAG]
> 
> *Since* 1.0.0

> [!PANEL]
> 
> ## Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | value | `boolean \| 0 \| 1 \| 2` | x | `normal` | The value of the checkbox |
> | checkedComponent | `React.ReactNode` | x | The default checkmark created as a styled div | Customises the symbol rendered when the checkbox is fully checked
> | intermediateComponent | `React.ReactNode` | x | The default dash created as a styled div | Customises the symbol rendered when the checkbox is partially checked
>
> ### Shared props
> - `[!ARIA]`
> - `[!MUTABLE]`
> - `[!NO-CHILDREN]`
> - `BoxValueInputProps`

## Values
A checkbox component has 2 modes based on the value provided:
- Default binary mode
- Tristate/ternary mode

> **! Note**
> 
> In both modes, the checkbox stays optional and true to its basic definition

### Default binary mode
This is the default behaviour of the checkbox. It is achieved by passing a `boolean` as the `value` prop or by passing `0` or `2`.
- When `false` or `0` are passed, the checkbox is not checked.
- When `true` or `2` are passed, the checkbox is checked.

### Tristate/terneray mode
The checkbox enters this mode only when `1` is passed. This value tells the checkbox to be in an "undefined" state, a.k.a. an "intermediate" style.

```ts
///checkbox-tristate-demo///
import { CheckBox } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function CheckboxTristateDemo ()
{
	const [value, setValue] = useState<0 | 1 | 2> (0);
	const handleChange = useCallback (
		() => 
		{
			setValue (
				old =>
					((old + 1) % 3) as 0 | 1 | 2
			);
		},
		[setValue]
	);

	return (
		<CheckBox
			label = "I am in tristate mode, click me to cycle through my states"
			value = {value}
			onChange = {handleChange}
		/>
	);
}
```

## Style props
On top of the default id and className props, in order to allow for more customisations, checkbox accepts more style props than the usual.
- `style`: the basic styling prop, which styles the checkbox's box, visible when the checkbox is not checked
- `checkedStyle`: defines a set of styles that override the basic `style` only when the checkbox is checked
- `intermediateStyle`: same as `checkedStyle` but in the case where the checkbox is in its intermediate state, i.e. when `value` is `1`.