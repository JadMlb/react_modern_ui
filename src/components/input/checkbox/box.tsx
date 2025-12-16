import { useEffect, useMemo, useRef } from "react";
import { CheckboxProps } from "../../../types";
import useStyle from "../../../hooks/useStyle";

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

	const injectedBaseStyle = useMemo (
		() => ({
			":hover": {
				borderColor: disabled || readonly ? "gray" : "primaryDark"
			},
			borderColor: disabled || readonly ? "gray" : "primary"
		}),
		[disabled, readonly]
	);
	const finalBaseStyle = useStyle ("checkbox", style, injectedBaseStyle);
	const injectedCheckedStyle = useMemo (
		() => ({
			backgroundColor: readonly || disabled ? "transparent" : finalBaseStyle.backgroundColor,
		}),
		[disabled, readonly, finalBaseStyle.backgroundColor]
	);
	const finalCheckedStyle = useStyle ("checkbox", checkedStyle, injectedCheckedStyle, "checkedStyle");
	const injectedIntermediateStyle = useMemo (
		() => ({
			backgroundColor: readonly || disabled ? "transparent" : finalBaseStyle.backgroundColor,
		}),
		[disabled, readonly, finalBaseStyle.backgroundColor]
	);
	const finalIntermediateStyle = useStyle ("checkbox", intermediateStyle, injectedIntermediateStyle, "intermediateStyle");

	const finalStyle = useMemo (
		() => ({
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
			ref = {ref}
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