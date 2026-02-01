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
		readOnly,
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
		forceMode: _,
		...rest
	} = props;
	
	const css = useStyle ("radioButtonsGroup", props, style);
	const checkboxCss = useStyle ("radioButtonsGroup", props, checkboxStyle, "checkboxStyle");
	const checkboxActiveCss = useStyle ("radioButtonsGroup", props, checkboxActiveStyle, "checkboxActiveStyle");
	const labelCss = useStyle ("radioButtonsGroup", props, checkboxLabelStyle, "checkboxLabelStyle");
	const clearButtonCss = useStyle ("radioButtonsGroup", props, clearButtonStyle, "clearButtonStyle");
	
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
			readOnly = {readOnly}
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
					style = {clearButtonCss}
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
									readOnly = {readOnly}
									disabled = {disabled}
									form = {form}
									{...checkboxProps}
								/>
			)
		}</InputBase>
	);
}