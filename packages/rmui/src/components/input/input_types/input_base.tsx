/** @jsxImportSource @emotion/react */
import * as React from "react";
import InputLabel from "./label";
import InputHint from "./hint";
import Fieldset from "./fieldset";
import useStyle from "../../../hooks/useStyle";
import { InputBaseProps } from "../../../types/components/input/Base";
import useProps from "../../../hooks/useProps";

const InputBase = React.forwardRef<HTMLDivElement, InputBaseProps> (
	(instanceProps, ref) =>
	{
		const props = useProps ("input.base", instanceProps);
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
			children,
			onClick,
			onFocus,
			onBlur,
			onContextMenu,
			forceMode: _,
			...aria
		} = props;

		const css = useStyle ("input.base", props, style);
		const fieldsetCss = useStyle ("input.base", props, fieldsetStyle, "fieldsetStyle");
		const labelCss = useStyle ("input.base", props, labelStyle, "labelStyle");
		const hintCss = useStyle ("input.base", props, hintStyle, "hintStyle");
		const errorCss = useStyle ("input.base", props, errorTextStyle, "errorTextStyle");

		return (
			<Fieldset disabled = {disabled} style = {fieldsetCss} onContextMenu = {onContextMenu} {...aria}>
				<InputLabel
					htmlFor = {inputId}
					style = {labelCss}
					hidden = {hideLabel}
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
					hintStyle = {hintCss}
					textOnError = {textOnError}
					errorTextStyle = {errorCss}
				/>
			</Fieldset>
		);
	}
);

export default InputBase;