import { useEffect, useRef, useState } from "react";
import { SwitchProps } from "../../../types/components/Switch/SwitchProps";
import SwitchWrapper from "./wrapper";
import SwitchSlider from "./slider";
import SwitchLabel from "./label";

export default function Switch ({id, className, style, activatedStyle, label, labelStyle, hideLabel, handleStyle, activatedHandleStyle, parentStyle, name, value, readonly, disabled, onChange, form, onContextMenu}: SwitchProps)
{
	const [isSwitched, setIsSwitched] = useState (value ?? false);
	const inputRef = useRef<HTMLInputElement | null> (null);

	useEffect (
		() => setIsSwitched (value ?? false),
		[value]
	);
	
	function handleChange (e: React.ChangeEvent<HTMLInputElement>)
	{
		setIsSwitched (e.target.checked);
		onChange?. (e, e.target.checked);
	}

	function handleClick ()
	{
		inputRef.current?.click();
	}

	return (
		<SwitchWrapper
			id = {id}
			className = {className}
			style = {parentStyle}
		>
			<SwitchSlider
				value = {isSwitched}
				backgroundStyle = {style}
				activatedBackgroundStyle = {activatedStyle}
				handleStyle = {handleStyle}
				activatedHandleStyle = {activatedHandleStyle}
				onClick = {handleClick}
				onContextMenu = {onContextMenu}
				readonly = {readonly}
				disabled = {disabled}
			/>
			<SwitchLabel
				hideLabel = {hideLabel}
				style = {labelStyle}
				onClick = {handleClick}
			>
				{label}
			</SwitchLabel>
			<input
				ref = {inputRef}
				name = {name}
				type = "checkbox"
				checked = {isSwitched}
				onChange = {readonly || disabled ? undefined : handleChange}
				readOnly = {readonly}
				disabled = {disabled}
				form = {form}
				hidden
			/>
		</SwitchWrapper>
	);
}