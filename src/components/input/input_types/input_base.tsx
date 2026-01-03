/** @jsxImportSource @emotion/react */
import * as React from "react";
import InputLabel from "./label";
import InputHint from "./hint";
import Fieldset from "./fieldset";
import InputBaseProps from "../../../types/components/input/Base/InputBaseProps";
import useStyle from "../../../hooks/useStyle";

const InputBase = React.forwardRef<HTMLDivElement, InputBaseProps> (
	(props, ref) =>
	{
		const {
			id,
			className,
			inputId,
			label,
			style,
			fieldsetStyle,
			labelStyle,
			trailing,
			hint,
			hintStyle,
			textOnError,
			errorTextStyle,
			isError = false,
			hideLabel,
			disabled,
			readonly,
			children,
			onClick,
			onFocus,
			onBlur,
			onContextMenu
		} = props;

		const injectedStyles = React.useCallback (
			(isDark: boolean) => ({
				border: `1px solid ${isError ? "error" : "gray"}`,
				color: disabled ? "gray" : undefined,
				backgroundColor: disabled || readonly ? "unset" : `gray${isDark ? "Dark" : "Light"}`,
				":hover": {
					border: `1px solid ${disabled || readonly ? "gray" : `primary${isDark ? "Dark" : "Elevated"}`}`
				},
				":focus": {
					border: `1px solid ${disabled || readonly ? "gray" : "primary"}`
				}
			}),
			[isError, disabled, readonly]
		);
		const css = useStyle ("input.base", style, injectedStyles);

		return (
			<Fieldset disabled = {disabled} style = {fieldsetStyle} onContextMenu = {onContextMenu}>
				<InputLabel
					htmlFor = {inputId}
					style = {labelStyle}
					hidden = {hideLabel}
					disabled = {disabled}
				>
					{label}
				</InputLabel>
				<div
					css = {css}
					tabIndex = {0}
					onClick = {onClick}
					onFocus = {onFocus}
					onBlur = {onBlur}
					ref = {ref}
					className = {`rmui-input-base ${className ?? ""}`}
					id = {id}
				>
					{children}
					{trailing}
				</div>
				<InputHint
					isError = {isError}
					hint = {hint}
					hintStyle = {hintStyle}
					textOnError = {textOnError}
					errorTextStyle = {errorTextStyle}
				/>
			</Fieldset>
		);
	}
);

export default InputBase;