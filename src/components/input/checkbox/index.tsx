import { useRef } from "react";
import { CheckboxProps } from "../../../types";
import CheckboxLabel from "./label";
import HiddenInput from "./hidden";
import DefaultCheck from "./default_check";
import DefaultIntermediate from "./default_intermediate";
import CheckboxBox from "./box";

/**
 * Renders a Checkbox component with specified value, either in normal checked/unchecked, or in tri-value
 */
export default function Checkbox ({id, name, defaultValue, value, className, style, label, labelStyle, intermediateStyle, checkedStyle, checkedComponent = <DefaultCheck/>, intermediateComponent = <DefaultIntermediate/>, disabled, readonly, hideLabel, onChange, onBlur, onFocus, onKeyDown, onKeyUp, autoFocus, form}: CheckboxProps)
{
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
			style = {labelStyle}
			id = {id}
		>
			<CheckboxBox
				value = {value}
				defaultValue = {defaultValue}
				checkedComponent = {checkedComponent}
				intermediateComponent = {intermediateComponent}
				checkedStyle = {checkedStyle}
				intermediateStyle = {intermediateStyle}
				style = {style}
				autoFocus = {autoFocus}
				onBlur = {handleBoxBlur}
				onFocus = {handleBoxFocus}
				onKeyDown = {handleBoxKeyDown}
				onKeyUp = {handleBoxKeyUp}
				readonly = {readonly}
				disabled = {disabled}
			/>
			<HiddenInput
				ref = {ref}
				name = {name}
				value = {value}
				defaultValue = {defaultValue}
				onChange = {onChange}
				// onBlur = {onBlur}
				// onFocus = {onFocus}
				onKeyDown = {onKeyDown}
				onKeyUp = {onKeyUp}
				form = {form}
				disabled = {disabled}
				readonly = {readonly}
			/>
		</CheckboxLabel>
	);
}