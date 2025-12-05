import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComboboxProps } from "../../../../types/components/Combobox/ComboboxProps";
import InputBase from "../input_base";
import { useDarkMode, useThemeParser } from "../../../../styles";
import ComboboxOption from "./option";
import { Option } from "../../../../types";
import Tag from "../../../state/tag";
import X from "./x";
import ComboboxTrailing from "./trailing";
import ComboboxOptionsRenderer from "./options_renderer";
import { OnChangeFunction } from "../../../../types/components/input/BoxValueInputProps";
import Menu from "../../../structure/menu";
import ValueWrapper from "./value_wrapper";

function Arrow ({up}: {up?: boolean})
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			width: "7px",
			height: "7px",
			borderBottom: `2px solid ${isDark ? "white" : "black"}`,
			borderRight: `2px solid ${isDark ? "white" : "black"}`,
			transform: `translate(-spacing.small, ${up ? "" : "-"}1.75px) rotate(${up ? -13 : 4}5deg)`
		}),
		[parseCss, up]
	);
	
	return (
		<div css = {css}/>
	);
}

const DEFAULT_ARROW_COMPONENT = {
	open: <Arrow up/>,
	closed: <Arrow/>
};

function defaultRenderOption (option: Option, selected?: boolean, onClick?: OnChangeFunction<Option>)
{
	return (
		<ComboboxOption
			key = {option.value}
			option = {option}
			selected = {selected}
			onClick = {option => onClick?. (null, option)}
		/>
	);
}

export default function Combobox ({id, className, name, options, label, labelStyle, value, hint, leading, readonly, disabled, hideLabel, menuProps, optional, style, fieldsetStyle, arrowComponent = DEFAULT_ARROW_COMPONENT, onChange, renderOption = defaultRenderOption}: ComboboxProps)
{
	const [isExpanded, setIsExpanded] = useState (false);
	const inputRef = useRef<HTMLDivElement | null> (null);

	function handleChange (e: React.ChangeEvent | null, option: Option)
	{
		onChange?. (e, option);
		setIsExpanded (false);
	}

	const getSelected = useCallback (
		(value: string) =>
		{
			let mappedOptions: Option[];
			if (Array.isArray (options))
				mappedOptions = options;
			else
				mappedOptions = Object.values (options)
								.flatMap (v => v);
			return mappedOptions.find (o => o.value === value);
		},
		[options]
	);

	const formatValue = useCallback (
		(value: string | string[]) =>
		{
			if (Array.isArray (value))
				return value.map (
					v =>
					{
						const option = getSelected (v);
						if (!option)
							return;
						
						return <Tag
									key = {option.value}
									onClick = {
										e =>
										{
											e.stopPropagation();
											if (!readonly && !disabled)
												handleChange (null, option);
										}
									}
								>
									{option.display} {!readonly && !disabled && <X/>}
								</Tag>;
					}
				)
				.filter (v => v !== undefined);

			return getSelected(value)?.display;
		},
		[getSelected]
	);

	const formattedValue = useMemo (
		() => formatValue (value),
		[formatValue, value, readonly, disabled]
	);

	function expand (e: React.FocusEvent)
	{
		e.stopPropagation();
		setIsExpanded (!disabled && !readonly);
	}

	function close (e: React.FocusEvent)
	{
		e.stopPropagation();
		setIsExpanded (false);
	}

	useEffect (
		() =>
		{
			if (!isExpanded)
				requestAnimationFrame (
					() =>
					{
						if (document.activeElement === inputRef.current)
							inputRef.current?.blur();
					}
				);
		},
		[isExpanded]
	);
	
	return (
		<>
			<InputBase
				className = {className}
				id = {id}
				fieldsetStyle = {fieldsetStyle}
				inputId = {`combo-${name}`}
				ref = {inputRef}
				label = {label}
				labelStyle = {labelStyle}
				trailing = {
					<ComboboxTrailing
						arrowComponent = {arrowComponent}
						expanded = {isExpanded}
						optional = {optional}
						value = {value}
						readonly = {readonly}
						disabled = {disabled}
						onChange = {onChange}
					/>
				}
				hint = {hint}
				hideLabel = {hideLabel}
				style = {style}
				onFocus = {expand}
				onBlur = {close}
				disabled = {disabled}
				readonly = {readonly}
			>
				{leading}
				<ValueWrapper>{formattedValue}</ValueWrapper>
			</InputBase>
			<Menu
				open = {!disabled && isExpanded}
				onClose = {() => setIsExpanded (false)}
				anchorElement = {inputRef.current}
				{...menuProps}
			>
				<ComboboxOptionsRenderer
					options = {options}
					renderOption = {renderOption}
					disabled = {disabled}
					readonly = {readonly}
					onClick = {handleChange}
					value = {value}
				/>
			</Menu>
		</>
	);
}