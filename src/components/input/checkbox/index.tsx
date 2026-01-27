import { useRef } from "react";
import { CheckboxProps } from "../../../types";
import CheckboxLabel from "./label";
import HiddenInput from "./hidden";
import CheckboxBox from "./box";
import useProps from "../../../hooks/useProps";
import useStyle from "../../../hooks/useStyle";

/**
 * Renders a Checkbox component with specified value, either in normal checked/unchecked, or in tri-value
 */
export default function Checkbox (instanceProps: CheckboxProps)
{
	const props = useProps ("checkbox", instanceProps);
	
	const {
		as,
		autoFocus,
		checkedComponent,
		checkedStyle,
		className,
		defaultValue,
		disabled,
		form,
		hideLabel,
		id,
		intermediateComponent,
		intermediateStyle,
		label,
		labelStyle,
		name,
		onBlur,
		onChange,
		onContextMenu,
		onFocus,
		onKeyDown,
		onKeyUp,
		readonly,
		style,
		value,
		...aria
	} = props;
	
	const labelCss = useStyle ("checkbox", props, labelStyle, "labelStyle");
	const css = useStyle ("checkbox", props, style);
	const checkedCss = useStyle ("checkbox", props, checkedStyle, "checkedStyle");
	const intermediateCss = useStyle ("checkbox", props, intermediateStyle, "intermediateStyle");
	
	const ref = useRef<HTMLInputElement | null> (null);

	function handleBoxFocus (e: React.FocusEvent<HTMLDivElement>)
	{
		const input = ref.current;
		if (!onFocus || !input)
			return;

		const event = new FocusEvent (
			"focus",
			{
				bubbles: e.bubbles,
				cancelable: e.cancelable,
				relatedTarget: input
			}
		);

		onFocus ({
			isDefaultPrevented: () => e.isDefaultPrevented(),
			isPropagationStopped: () => e.isPropagationStopped(),
			relatedTarget: input,
			target: input,
			bubbles: e.bubbles,
			cancelable: e.cancelable,
			currentTarget: input,
			defaultPrevented: e.defaultPrevented,
			eventPhase: e.eventPhase,
			isTrusted: e.isTrusted,
			nativeEvent: event,
			preventDefault: e.preventDefault,
			stopPropagation: e.stopPropagation,
			persist: e.persist,
			timeStamp: e.timeStamp,
			type: e.type
		});
	}
	
	function handleBoxBlur (e: React.FocusEvent<HTMLDivElement>)
	{
		const input = ref.current;
		if (!onBlur || !input)
			return;

		const event = new FocusEvent (
			"blur",
			{
				bubbles: e.bubbles,
				cancelable: e.cancelable,
				relatedTarget: input
			}
		);
		
		onBlur ({
			isDefaultPrevented: () => e.isDefaultPrevented(),
			isPropagationStopped: () => e.isPropagationStopped(),
			relatedTarget: input,
			target: input,
			bubbles: e.bubbles,
			cancelable: e.cancelable,
			currentTarget: input,
			defaultPrevented: e.defaultPrevented,
			eventPhase: e.eventPhase,
			isTrusted: e.isTrusted,
			nativeEvent: event,
			preventDefault: e.preventDefault,
			stopPropagation: e.stopPropagation,
			persist: e.persist,
			timeStamp: e.timeStamp,
			type: e.type
		});
	}

	function handleBoxKeyDown (e: React.KeyboardEvent<HTMLDivElement>)
	{
		if (!ref.current)
			return;
		const event = new KeyboardEvent (
			"keydown",
			{
				key: e.key,
				code: e.code,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				repeat: e.repeat,
				bubbles: e.bubbles,
				cancelable: e.cancelable,
				detail: e.detail,
				location: e.location
			}
		);
		ref.current.dispatchEvent (event);
	}
	
	function handleBoxKeyUp (e: React.KeyboardEvent<HTMLDivElement>)
	{
		if (!ref.current)
			return;
		const event = new KeyboardEvent (
			"keyup",
			{
				key: e.key,
				code: e.code,
				altKey: e.altKey,
				ctrlKey: e.ctrlKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey,
				repeat: e.repeat,
				bubbles: e.bubbles,
				cancelable: e.cancelable,
				detail: e.detail,
				location: e.location
			}
		);
		ref.current.dispatchEvent (event);
	}
	
	return (
		<CheckboxLabel
			className = {className}
			hideLabel = {hideLabel}
			label = {label}
			style = {labelCss}
			id = {id}
			onContextMenu = {onContextMenu}
			as = {as}
		>
			<CheckboxBox
				value = {value}
				defaultValue = {defaultValue}
				checkedComponent = {checkedComponent}
				intermediateComponent = {intermediateComponent}
				checkedStyle = {checkedCss}
				intermediateStyle = {intermediateCss}
				style = {css}
				autoFocus = {autoFocus}
				onBlur = {handleBoxBlur}
				onFocus = {handleBoxFocus}
				onKeyDown = {handleBoxKeyDown}
				onKeyUp = {handleBoxKeyUp}
			/>
			<HiddenInput
				ref = {ref}
				name = {name}
				value = {value}
				defaultValue = {defaultValue}
				onChange = {onChange}
				onKeyDown = {onKeyDown}
				onKeyUp = {onKeyUp}
				form = {form}
				disabled = {disabled}
				readonly = {readonly}
				{...aria}
			/>
		</CheckboxLabel>
	);
}