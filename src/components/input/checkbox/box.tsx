import { useEffect, useMemo, useRef } from "react";
import { CheckboxProps, StaticStyle } from "../../../types";

interface CheckboxBoxProps
{
	value?: CheckboxProps["value"];
	defaultValue?: CheckboxProps["defaultValue"];
	checkedComponent?: CheckboxProps["checkedComponent"];
	intermediateComponent?: CheckboxProps["intermediateComponent"];
	style?: StaticStyle;
	intermediateStyle?: StaticStyle;
	checkedStyle?: StaticStyle;
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
	onFocus?: React.FocusEventHandler<HTMLDivElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
	autoFocus?: boolean;
}

export default function CheckboxBox ({defaultValue, value, checkedComponent, intermediateComponent, style, checkedStyle, intermediateStyle, autoFocus, onBlur, onFocus, onKeyDown, onKeyUp}: CheckboxBoxProps)
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

	const finalStyle = useMemo (
		() => ({
			...style,
			...(
				isFullyChecked ?
					checkedStyle :
					isPartiallyChecked ?
						intermediateStyle :
						{}
			)
		}),
		[isFullyChecked, isPartiallyChecked, style, checkedStyle, intermediateStyle]
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