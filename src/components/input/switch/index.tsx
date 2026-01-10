import { useEffect, useRef, useState } from "react";
import { SwitchProps } from "../../../types/components/Switch/SwitchProps";
import SwitchWrapper from "./wrapper";
import SwitchSlider from "./slider";
import SwitchLabel from "./label";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

export default function Switch (instanceProps: SwitchProps)
{
	const props = useProps ("switch", instanceProps)
	const {
		id,
		className,
		style,
		activatedStyle,
		label,
		labelStyle,
		hideLabel,
		handleStyle,
		activatedHandleStyle,
		parentStyle,
		name,
		value,
		readonly,
		disabled,
		form,
		onChange,
		onContextMenu
	} = props;

	const parentCss = useStyle ("switch", props, parentStyle, "parentStyle");
	const css = useStyle ("switch", props, style);
	const activatedCss = useStyle ("switch", props, activatedStyle, "activatedStyle");
	const handleCss = useStyle ("switch", props, handleStyle, "handleStyle");
	const activatedHandleCss = useStyle ("switch", props, activatedHandleStyle, "activatedHandleStyle");
	const labelCss = useStyle ("switch", props, labelStyle, "labelStyle");
	
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
			style = {parentCss}
		>
			<SwitchSlider
				value = {isSwitched}
				backgroundStyle = {css}
				activatedBackgroundStyle = {activatedCss}
				handleStyle = {handleCss}
				activatedHandleStyle = {activatedHandleCss}
				onClick = {handleClick}
				onContextMenu = {onContextMenu}
			/>
			<SwitchLabel
				hideLabel = {hideLabel}
				style = {labelCss}
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