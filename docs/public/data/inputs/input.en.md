# Input

`Input` is a generic term and component that encapsulates multiple types of inputs

> [!TAG]
> 
> *Since* 1.0.0

> [!PANEL]
>
> ## Props
> Input props change based on the type of the input. The table below shows the base props that are shared accross all types of inputs.
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"text" \| "email" \| "password" \| "number" \| "date" \| "datetime" \| "time" \| "month" \| "week" \| "search" \| "url" \| "tel"` | ✓ | - | The type of the input which defines the type of the value and the specific props. This value is passed down to the html tag. |
> ### Shared props
> - `[!ARIA]`
> - `[!MUTABLE]`

## Base
All inputs use a shared component called `InputBase` which renders the input's:
- label
- style of the container around the input
- hint / error

> [!PANEL]
>
> ### Props
> `InputBase`'s props are not inherited
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | inputId | `string` | x | `undefined` | The id of the input. This prop is used for the semantics of the label. |
> | id | `string` | x | `undefined` | The css id of the wrapper component |
> | className | `string` | x | `undefined` | The css class of the wrapper component |
> | label | `string` | x | `undefined` | The label to give to this input base |
> | labelStyle | `Style` | x | `undefined` | The style of the label |
> | hideLabel | `boolean` | x | `undefined` | Hides the label even if a value is given |
> | hint | `string` | x | `undefined` | Displays a hint under the wrapper |
> | hintStyle | `Style` | x | `undefined` | The style of the hint |
> | isError | `boolean` | x | `undefined` | Signals that the contents of the input are erronous and changes the style of the border |
> | textOnError | `string` | x | `undefined` | Defines the text to show when `isError` is `true` which replaces the hint |
> | disabled | `boolean` | x | `undefined` | Disables all interactions with this input |
> | readOnly | `boolean` | x | `undefined` | Disables data-manipulating interactions with this input and keeps the current value |
> | onClick | `MouseEventHandler` | x | `undefined` | The callback to be executed when the input is clicked |
> | onContextMenu | `MouseEventHandler` | x | `undefined` | The callback to be executed when the context menu is requested on this input |
> | onBlur | `FocusEventHandler` | x | `undefined` | The callback to be executed when the input is no longer focused |
> | onFocus | `FocusEventHandler` | x | `undefined` | The callback to be executed when the input is focused |
> 
> > **! Note**
> >
> > All event handlers are imported from `React`
>
> ### Shared props
> - `[!ARIA]`
> - `[!MUTABLE]`
> - `[!CHILDREN-OPT]`
> 
> > **! Note**
> >
> > The `as` prop changes the rendering of the wrapper of the `InputBase` which is a `<fieldset/>` by default

### Hint & Error
`InputBase` allows to display a hint under the input to guide the user to how to enter data. This element is purely for UX and does not help semantically.

It is possible to control the error state of the input to invalidate and give feedback to the user. This can be done using the `isError` and `textOnError` props. The former declares the input as invalid and the other defines the text that will replace the hint text.

```tsx
///input-hint-error-demo///
import { Input } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function InputHintErrorDemo ()
{
	const [email, setEmail] = useState ("");
	const [isError, setIsError] = useState (false);

	const handleChange = useCallback (
		(_: React.ChangeEvent | null, value: string) =>
		{
			setEmail (value);
			setIsError (!!value && !/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test (value))
		},
		[setIsError, setEmail]
	);

	return (
		<Input
			label = "Enter your email and try to enter any value to see what happens"
			placeholder = "Enter your value here"
			type = "email"
			value = {email}
			onChange = {handleChange}
			hint = "johnny.appleseed@email.com"
			textOnError = "This email is invalid"
			isError = {isError}
		/>
	);
}
```

## Text and Text-like inputs
This category includes all inputs that accept a textual value (execluding dates), such as:
- text
- email
- password
- search
- url
- tel

> [!PANEL]
>
> ### Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"text"` | ✓ | - | Indicates that this input is a text input |
> | value | `string` | x | undefined | The value inside of the input |
> | onChange | `OnChangeFunction <string>` | x | undefined | The callback executed when the value inside of the input changes |
> | minLength | `number` | x | undefined | The minimum allowed number of characters of the value |
> | maxLength | `number` | x | undefined | The maximum allowed number of characters of the value |
> | displayLength | `boolean` | x | undefined | Shows the current and the max number of characters allowed. Only works if `maxCharCount` property is set. |
> | pattern | `string` | x | undefined | Defines the pattern of the input, treated as a regex string. This will control the input value and would not allow any values that do not match the pattern. |
> | inputMode | `"none" \| "text" \| "tel" \| "url" \| "email" \| "numeric" \| "decimal" \| "search"` | x | undefined | Hints to the type of virtual keyboard on mobile devices |
> #### Shared props
> - `BasicInputProps`

### Text
Text inputs allow for single-line and multi-line values.

#### Single-line text input
> [!PANEL]
>
> ##### Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"text"` | ✓ | - | Indicates that this input is a text input |
> | multiline | `false` | x | undefined | Indicates that this text input is a single line input |
> | autoCorrect | `string` | x | undefined | Enables device's autocorrect feature on this input |

```tsx
///input-text-single-demo///
<Input
	type = "text"
	maxLength = {20}
/>
```

#### Multi-line text input
A multi-line text input renders an html `<textarea/>` element.

> [!PANEL]
>
> ##### Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"text"` | ✓ | - | Indicates that this input is a text input |
> | multiline | `true` | ✓ | `true` | Indicates that this text input is a multi line input |
> | autoCorrect | `string` | x | undefined | Enables device's autocorrect feature on this input |
> | wrap | `"off" \| "soft" \| "hard"` | x | undefined | Determines how the text is wrapped in a multiline text input: "off" means no wrapping, "soft" wraps text visually and "hard" adds line breaks to the value when line wraps |
> | rows | `number` | x | `2` |  Sets the denumber of rows when `multiline` is set. |

```tsx
///input-text-multi-demo///
<Input
	type = "text"
	maxLength = {20}
	multiline
	displayLength
/>
```

## Number input
> [!PANEL]
>
> ### Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"number"` | ✓ | - | Indicates that this input is a number input |
> | value | `number` | x | undefined | The value inside of the input |
> | onChange | `OnChangeFunction <number>` | x | undefined | The callback executed when the value inside of the input changes |
> | range | `[number \| null, number \| null]` | x | `[infinity, infinity]` | Defines the range, bounds included, of the value in the input field. If an edge is null, it's equivalent to an infinity. |
> | step | `number` | x | `1` | Defines the step size that the buttons will increment or decrement |
> | precision | `number` | x | `0` | Defines the precision of the value inside of the number field. If precision <= 0, the value is an integer, otherwise a real number with `precision` amount of digits in the decimal places |
> #### Shared props
> - `BasicInputProps`

```tsx
///input-number-demo///
<Input
	type = "number"
	range = {[10, 20]}
	value = {value}
	onChange = {handleChange}
/>
```

> **! Note**
>
> The input would not change if the initial value is out of range

## Timestamp-like inputs
This category includes all time-related inputs:
- date
- datetime
- time
- month
- week

> [!PANEL]
>
> ### Props
> | Prop name | Type | Required | Default value | Description |
> |---|---|---|---|---|
> | type | `"date" \| "datetime" \| "time"` | ✓ | - | Indicates that this input is a number input |
> | value | `string \| Date` | x | undefined | The value inside of the input |
> | onChange | `OnChangeFunction <Date | string>` | x | undefined | The callback executed when the value inside of the input changes |
> | range | `[Date \| null, Date \| null]` | x | `[infinity, infinity]` | Defines the range, bounds included, of the value in the input field. If bound is null, it's equivalent to an infinity/unset. |
> #### Shared props
> - `BasicInputProps`

> **! Note**
>
> `datetime` maps to `datetime-local` in the html input type attribute.

```tsx
///input-date-demo///
import { Input } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function InputDatetimeDemo ()
{
	const [value, setValue] = useState<string | Date> (new Date());
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, value: Date | string) =>
		{
			setValue (value);
		},
		[setValue]
	);

	return (
		<Input
			type = "datetime"
			range = {[new Date(), null]}
			value = {value}
			onChange = {handleChange}
		/>
	);
}
```