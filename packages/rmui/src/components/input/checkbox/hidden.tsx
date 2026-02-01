/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import * as React from "react";
import { CheckboxProps } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";

const Input = styled.input
`
	display: none;
`;

interface HiddenInputProps extends BaseProps
{
	name?: CheckboxProps["name"];
	defaultValue?: CheckboxProps["defaultValue"];
	value?: CheckboxProps["value"];
	onChange?: CheckboxProps["onChange"];
	onKeyUp?: CheckboxProps["onKeyUp"];
	onKeyDown?: CheckboxProps["onKeyDown"];
	form?: CheckboxProps["form"];
	disabled?: boolean;
	readonly?: boolean;
}

const HiddenInput = React.forwardRef<HTMLInputElement, HiddenInputProps> (
	(props, ref) =>
	{
		const {
			name,
			defaultValue,
			value,
			onChange,
			onKeyUp,
			onKeyDown,
			disabled,
			readonly,
			form,
			...rest
		} = props;

		const defaultChecked = React.useMemo (
			() =>
			{
				if (defaultValue === undefined || typeof defaultValue === "boolean")
					return defaultValue;
				return defaultValue !== 0;
			},
			[defaultValue]
		);
		
		const checked = React.useMemo (
			() =>
			{
				if (value === undefined || typeof value === "boolean")
					return value;
				return value !== 0;
			},
			[value]
		);
		
		return (
			<Input
				ref = {ref}
				type = "checkbox"
				name = {name}
				defaultChecked = {defaultChecked}
				checked = {checked}
				onChange = {disabled || readonly ? undefined : e => onChange?. (e, e.target.value)}
				onKeyUp = {onKeyUp}
				onKeyDown = {onKeyDown}
				form = {form}
				disabled = {disabled}
				readOnly = {readonly}
				{...rest}
			/>
		);
	}
);

export default HiddenInput;