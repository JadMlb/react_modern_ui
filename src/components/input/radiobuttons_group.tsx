import Checkbox from "./checkbox";
import { useCallback, useEffect, useState } from "react";
import { RadioButtonsGroupProps } from "../../types/components/RadioButtonsGroup/RadioButtonsGroupProps";
import Button from "./button";
import X from "./input_types/combobox/x";
import Panel from "../structure/panel";
import InputLabel from "./input_types/label";
import InputHint from "./input_types/hint";
import { Style } from "../../styles";

const CHECKBOX_RADIO_STYLE = {borderRadius: "100%"} satisfies Style;

/**
 * Renders a group of radio buttons showing multiple options
 */
export default function RadioButtonsGroup ({className, id, name, optionsLabels, label, labelStyle, hideLabel, value, optional, style, checkboxProps, hint, isError, textOnError, readonly, disabled, onChange}: RadioButtonsGroupProps)
{
	const [checked, setChecked] = useState<number | null> (null);

	const updateSelection = useCallback (
		(e: React.ChangeEvent<Element> | null, newValue: string, index: number) =>
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
				if (typeof value === "number")
					optionIndex = value >= optionsLabels.length ? 0 : value;
				else
					optionIndex = optionsLabels.indexOf (value);
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
		<Panel
			title = {<InputLabel hidden = {hideLabel} style = {labelStyle}>{label}</InputLabel>}
			style = {{width: "fit-content", ...style}}
			className = {className}
			id = {id}
		>
			{
				optionsLabels?.map (
					(l, index) => <Checkbox
									key = {`radiobutton-${name}-${index}`}
									name = {`radiobutton-${name}-${index}`}
									label = {l}
									value = {checked === index}
									onChange = {e => updateSelection (e, l, index)}
									style = {CHECKBOX_RADIO_STYLE}
									readonly = {readonly}
									disabled = {disabled}
									{...checkboxProps}
								/>
				)
			}
			{
				optional &&
				<Button onClick = {clearSelection} style = {{width: "fit-content"}}><X/></Button>
			}
			<InputHint hint = {hint} textOnError = {textOnError} isError = {isError}/>
		</Panel>
	);
}