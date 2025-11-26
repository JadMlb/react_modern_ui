import { useCallback, useEffect, useState } from "react";
import { RadioButtonsGroupProps } from "../../types/components/RadioButtonsGroup/RadioButtonsGroupProps";
import Checkbox from "./checkbox";
import Button from "./button";
import X from "./input_types/combobox/x";
import InputBase from "./input_types/input_base";

import { Option } from "../../types";
import { Style } from "../../styles";

const CLEAR_BUTTON_STYLE = {
	width: "fit-content"
};

interface TrailingProps
{
	optional?: boolean;
	clearSelection?: () => void;
	style?: Style;
}

function Trailing ({optional, clearSelection, style}: TrailingProps)
{
	
	if (!optional)
		return null;
	
	return (
		<Button
			onClick = {clearSelection}
			style = {{...CLEAR_BUTTON_STYLE, ...style}}
		>
			<X/>
		</Button>
	);
}

const CHECKBOX_RADIO_STYLE = {borderRadius: "100%"} satisfies Style;
const STYLE = {
	flexDirection: "column",
	alignItems: "unset",
	width: "fit-content",
	backgroundColor: "transparent"
} satisfies Style;

/**
 * Renders a group of radio buttons showing multiple options
 */
export default function RadioButtonsGroup ({className, id, name, options, label, labelStyle, hideLabel, value, optional, style, clearButtonStyle, checkboxProps, hint, isError, textOnError, readonly, disabled, form, fieldsetStyle, onChange, onBlur, onFocus, onKeyDown, onKeyUp}: RadioButtonsGroupProps)
{
	const [checked, setChecked] = useState<number | null> (null);

	const updateSelection = useCallback (
		(e: React.ChangeEvent<Element> | null, newValue: Option, index: number) =>
		{
			setChecked (index);

			if (onChange)
				onChange (e, newValue);
		},
		[onChange, setChecked]
	);
	
	const clearSelection = useCallback (
		() =>
		{
			setChecked (null);

			if (onChange)
				onChange (null, null);
		},
		[onChange, setChecked]
	);

	useEffect (
		() =>
		{
			if (value !== undefined)
			{
				let optionIndex = 0;
				optionIndex = options.findIndex (o => o.value === value);
				if (optionIndex < 0)
					optionIndex = 0;

				setChecked (optionIndex);
			}
			else
				setChecked (null);
		},
		[value]
	);

	return (
		<InputBase
			label = {label}
			labelStyle = {labelStyle}
			hideLabel = {hideLabel}
			hint = {hint}
			textOnError = {textOnError}
			isError = {isError}
			disabled = {disabled}
			readonly = {readonly}
			className = {className}
			id = {id}
			style = {{...STYLE, ...style}}
			fieldsetStyle = {fieldsetStyle}
			onBlur = {onBlur}
			onFocus = {onFocus}
			trailing = {
				<Trailing
					optional = {optional}
					style = {clearButtonStyle}
					clearSelection = {clearSelection}
				/>
			}
		>{
			options?.map (
				(l, index) => <Checkbox
									key = {`radiobutton-${name}-${l.value}`}
									name = {`radiobutton-${name}-${l.value}`}
									label = {l.display}
									value = {checked === index}
									onChange = {e => updateSelection (e, l, index)}
									style = {CHECKBOX_RADIO_STYLE}
									readonly = {readonly}
									disabled = {disabled}
									form = {form}
									{...checkboxProps}
								/>
			)
		}</InputBase>
	);
}