import * as React from "react";
import DateTimeInputProps from "../../../types/components/input/datetime/DateTimeInputProps";
import TimeInputProps from "../../../types/components/input/datetime/TimeInputProps";
import DateInputProps from "../../../types/components/input/datetime/DateInputProps";
import InputBase from "./input_base";
import { useTheme } from "../../../styles";
import X from "./combobox/x";

interface TrailingProps
{
	trailing?: React.ReactNode;
	optional?: boolean;
	handleClear?: (e: React.MouseEvent) => void;
}

function Trailing ({trailing, optional, handleClear}: TrailingProps)
{
	const {theme} = useTheme();
	const STYLE = React.useMemo (
		() => ({
			display: "flex",
			gap: theme.measurements.spacing.small,
			alignItems: "center"
		}),
		[]
	);

	return (
		<div style = {STYLE}>
			{trailing}
			{optional && <X onClick = {handleClear}/>}
		</div>
	);
}

const DateInput = React.forwardRef<HTMLInputElement, DateTimeInputProps | TimeInputProps | DateInputProps> (
	(props, ref) =>
	{
		const {
			id,
			className,
			name,
			label,
			labelStyle,
			hideLabel,
			hint,
			textOnError,
			isError,
			placeholder,
			defaultValue,
			value,
			range,
			type,
			leading,
			trailing,
			style,
			form,
			autoComplete,
			autoFocus,
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			readonly,
			disabled,
			optional
		} = props;
		const [shownValue, setShownValue] = React.useState (value ? value.toString() : "");
		const popupRef = React.useRef<HTMLDivElement> (null);
		const inputRef = React.useRef<HTMLInputElement> (null);
		
		React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null> (ref, () => inputRef.current);

		function handleClear (e: React.MouseEvent)
		{
			e.preventDefault();
			setShownValue ("");
			onChange?. (null, "");
		}

		function padDateTime (number: number)
		{
			return number.toString().padStart (2, "0");
		}

		const formatDate = React.useCallback (
			(date: Date) =>
			{
				const dateStr = `${date.getFullYear().toString().padStart (4, "0")}-${padDateTime (date.getMonth() + 1)}-${padDateTime(date.getDate())}`;
				const timeStr = `${padDateTime (date.getHours())}:${padDateTime (date.getMinutes())}${(props.type === "datetime" || props.type === "time") && props.withSeconds ? `:${padDateTime (date.getSeconds())}` : ""}`;

				switch (type)
				{
					case "date": return dateStr;
					case "time": return timeStr;
					case "datetime": return dateStr + " " + timeStr;
				}
			},
		[]
		)

		function expand (e: React.FocusEvent)
		{
			e.stopPropagation();
			if (!disabled && !readonly)
			{
				inputRef.current?.showPicker?.();
				inputRef.current?.click();
			}
		}

		function close (e: React.FocusEvent)
		{
			e.stopPropagation();
			inputRef.current?.blur();
		}

		React.useEffect (
			() =>
			{
				function handleClickOutside (e: MouseEvent)
				{
					if (popupRef.current && inputRef.current && !popupRef.current.contains (e.target as Element) && !inputRef.current.contains (e.target as Element))
						inputRef.current?.blur();
				}
				
				window.addEventListener ("click", handleClickOutside);

				return () => window.removeEventListener ("click", handleClickOutside);
			},
			[]
		);

		React.useEffect (
			() => setShownValue (value?.toString() ?? ""),
			[value]
		);

		return (
			<InputBase
				id = {id}
				className = {className}
				inputId = {`${name}-${type}-input`}
				hideLabel = {hideLabel}
				hint = {hint}
				textOnError = {textOnError}
				label = {label}
				labelStyle = {labelStyle}
				trailing = {
					<Trailing
						trailing = {trailing}
						optional = {optional}
						handleClear = {handleClear}
					/>
				}
				isError = {isError}
				style = {style}
				onFocus = {expand}
				onBlur = {close}
				disabled = {disabled}
				readonly = {readonly}
			>
				{leading}
				<input
					ref = {inputRef}
					name = {name}
					placeholder = {placeholder}
					type = {type === "datetime" ? "datetime-local" : type}
					defaultValue = {defaultValue}
					value = {shownValue}
					onChange = {e => onChange?. (e as React.ChangeEvent<Element>, formatDate (new Date (e.target.value)))}
					onBlur = {onBlur}
					onFocus = {onFocus}
					onKeyDown = {onKeyDown}
					onKeyUp = {onKeyUp}
					min = {(range && range[0] && formatDate (range[0])) || undefined}
					max = {(range && range[1] && formatDate (range[1])) || undefined}
					style = {{all: "unset", height: "auto", font: "inherit", flex: 1}}
					form = {form}
					autoComplete = {autoComplete}
					autoFocus = {autoFocus}
					disabled = {disabled}
					readOnly = {readonly}
				/>
			</InputBase>
		);
	}
);

export default DateInput;