import { useEffect, useMemo, useRef } from "react";
import { CheckboxProps } from "../../../types";
import { useThemeParser } from "../../../styles";
import { DEFAULT_CHECKBOX_STYLE } from "../../../types/components/Checkbox/CheckboxStyle";

interface CheckboxBoxProps
{
	value?: CheckboxProps["value"];
	defaultValue?: CheckboxProps["defaultValue"];
	checkedComponent?: CheckboxProps["checkedComponent"];
	intermediateComponent?: CheckboxProps["intermediateComponent"];
	style?: CheckboxProps["style"];
	intermediateStyle?: CheckboxProps["intermediateStyle"];
	checkedStyle?: CheckboxProps["checkedStyle"];
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
	onFocus?: React.FocusEventHandler<HTMLDivElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
	autoFocus?: boolean;
	readonly?: boolean;
	disabled?: boolean;
}

export default function CheckboxBox ({defaultValue, value, checkedComponent, intermediateComponent, style, checkedStyle, intermediateStyle, disabled, readonly, autoFocus, onBlur, onFocus, onKeyDown, onKeyUp}: CheckboxBoxProps)
{
	const ref = useRef<HTMLDivElement | null> (null);
	
	const isFullyChecked = useMemo (
		() => value === true || value === 2 ||
				value === undefined && (defaultValue === true || defaultValue === 2),
		[value, defaultValue]
	);

	const isPartiallyChecked = useMemo (
		() => value === 1 ||
				value === undefined && defaultValue === 1,
		[value, defaultValue]
	);

	const parseCss = useThemeParser();
	const finalBaseStyle = useMemo (
		() => parseCss ({
			...DEFAULT_CHECKBOX_STYLE.checkbox,
			":hover": {
				borderColor: disabled || readonly ? "gray" : "primaryDark"
			},
			borderColor: disabled || readonly ? "gray" : "primary",
			...style
		}),
		[parseCss, style, disabled, readonly]
	);
	const finalCheckedStyle = useMemo (
		() => parseCss ({
			...DEFAULT_CHECKBOX_STYLE.checked,
			backgroundColor: readonly || disabled ? "transparent" : DEFAULT_CHECKBOX_STYLE.checked?.backgroundColor,
			...checkedStyle
		}),
		[parseCss, checkedStyle, disabled, readonly]
	);
	const finalIntermediateStyle = useMemo (
		() => parseCss ({
			...DEFAULT_CHECKBOX_STYLE.intermediate,
			backgroundColor: readonly || disabled ? "transparent" : DEFAULT_CHECKBOX_STYLE.checked?.backgroundColor,
			...intermediateStyle
		}),
		[parseCss, intermediateStyle, disabled, readonly]
	);

	const finalStyle = useMemo (
		() => parseCss ({
			...finalBaseStyle,
			...(
				isFullyChecked ?
					finalCheckedStyle :
					isPartiallyChecked ?
						finalIntermediateStyle :
						{}
			)
		}),
		[isFullyChecked, isPartiallyChecked]
	);

	useEffect (
		() =>
		{
			if (autoFocus)
				ref.current?.focus();
		},
		[]
	);

	return (
		<div
			css = {finalStyle}
			tabIndex = {0}
			onBlur = {onBlur}
			onFocus = {onFocus}
			onKeyDown = {onKeyDown}
			onKeyUp = {onKeyUp}
		>{
			isFullyChecked ?
				checkedComponent :
				isPartiallyChecked ?
					intermediateComponent :
					<></>
		}</div>
	);
}