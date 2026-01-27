import { useCallback, useEffect, useState } from "react";
import { RadioButtonsGroupProps } from "../../../types/components/RadioButtonsGroup/RadioButtonsGroupProps";
import Checkbox from "../checkbox";
import InputBase from "../input_types/input_base";
import Trailing from "../radiobuttons_group/trailing";

import { Option } from "../../../types";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

/**
 * Renders a group of radio buttons showing multiple options
 */
export default function RadioButtonsGroup (instanceProps: RadioButtonsGroupProps)
{
	const props = useProps ("radioButtonsGroup", instanceProps);
	const {
		className,
		id,
		name,
		options,
		label,
		labelStyle,
		hideLabel,
		value,
		optional,
		style,
		clearButtonStyle,
		checkboxProps,
		hint,
		isError,
		textOnError,
		readonly,
		disabled,
		form,
		fieldsetStyle,
		onChange,
		onBlur,
		onFocus,
		checkboxActiveStyle,
		checkboxLabelStyle,
		checkboxStyle,
		onContextMenu,
		...rest
	} = props;
	
	const css = useStyle ("radioButtonsGroup", props, style);
	const checkboxCss = useStyle ("radioButtonsGroup", checkboxStyle, props, "checkboxStyle");
	const checkboxActiveCss = useStyle ("radioButtonsGroup", checkboxActiveStyle, props, "checkboxActiveStyle");
	const labelCss = useStyle ("radioButtonsGroup", checkboxLabelStyle, props, "checkboxLabelStyle");
	
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
			style = {css}
			fieldsetStyle = {fieldsetStyle}
			onBlur = {onBlur}
			onFocus = {onFocus}
			onContextMenu = {onContextMenu}
			trailing = {
				<Trailing
					optional = {optional}
					style = {clearButtonStyle}
					clearSelection = {clearSelection}
				/>
			}
			{...rest}
		>{
			options?.map (
				(l, index) => <Checkbox
									key = {`radiobutton-${name}-${l.value}`}
									name = {`radiobutton-${name}-${l.value}`}
									label = {l.display}
									value = {checked === index}
									onChange = {e => updateSelection (e, l, index)}
									style = {checkboxCss}
									checkedStyle = {checkboxActiveCss}
									labelStyle = {labelCss}
									readonly = {readonly}
									disabled = {disabled}
									form = {form}
									{...checkboxProps}
								/>
			)
		}</InputBase>
	);
}