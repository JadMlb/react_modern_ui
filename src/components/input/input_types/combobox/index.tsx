import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComboboxProps } from "../../../../types/components/Combobox/ComboboxProps";
import InputBase from "../input_base";
import ComboboxOption from "./option";
import { OnChangeFunction, Option } from "../../../../types";
import Tag from "../../../state/tag";
import X from "../x";
import ComboboxTrailing from "./trailing";
import ComboboxOptionsRenderer from "./options_renderer";
import Menu from "../../../structure/menu";
import ValueWrapper from "./value_wrapper";
import useProps from "../../../../hooks/useProps";
import useStyle from "../../../../hooks/useStyle";

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

export default function Combobox (props: ComboboxProps)
{
	const {
		name,
		options,
		labelStyle,
		value,
		hintStyle,
		leading,
		readonly,
		disabled,
		menuProps,
		optional,
		style,
		fieldsetStyle,
		arrowComponent,
		menuStyle,
		tagsStyle,
		errorTextStyle,
		onChange,
		renderOption = defaultRenderOption,
		...baseProps
	} = useProps ("combobox", props);

	const css = useStyle ("combobox", style);
	const fieldsetCss = useStyle ("combobox", fieldsetStyle, undefined, "fieldsetStyle");
	const labelCss = useStyle ("combobox", labelStyle, undefined, "labelStyle");
	const hintCss = useStyle ("combobox", hintStyle, undefined, "hintStyle");
	const errorCss = useStyle ("combobox", errorTextStyle, undefined, "errorTextStyle");
	const menuCss = useStyle ("combobox", menuStyle, undefined, "menuStyle");
	const tagCss = useStyle ("combobox", tagsStyle, undefined, "tagsStyle");
	
	const [isExpanded, setIsExpanded] = useState (false);
	const inputRef = useRef<HTMLDivElement | null> (null);

	function handleChange (e: React.ChangeEvent | null, option: Option)
	{
		e?.stopPropagation();
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
									style = {tagCss}
								>
									{option.display} {!readonly && !disabled && <X/>}
								</Tag>;
					}
				)
				.filter (v => v !== undefined);

			return getSelected(value)?.display;
		},
		[getSelected, tagCss]
	);

	const formattedValue = useMemo (
		() => formatValue (value),
		[formatValue, value, readonly, disabled]
	);

	function expand (e: React.SyntheticEvent)
	{
		e.stopPropagation();
		setIsExpanded (!disabled && !readonly);
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
				fieldsetStyle = {fieldsetCss}
				inputId = {`combo-${name}`}
				ref = {inputRef}
				labelStyle = {labelCss}
				hintStyle = {hintCss}
				errorTextStyle = {errorCss}
				trailing = {
					<ComboboxTrailing
						arrowComponent = {arrowComponent!}
						expanded = {isExpanded}
						optional = {optional}
						value = {value}
						readonly = {readonly}
						disabled = {disabled}
						onChange = {onChange}
					/>
				}
				style = {css}
				onClick = {expand}
				disabled = {disabled}
				readonly = {readonly}
				{...baseProps}
			>
				{leading}
				<ValueWrapper>{formattedValue}</ValueWrapper>
			</InputBase>
			<Menu
				open = {!disabled && isExpanded}
				onClose = {() => setIsExpanded (false)}
				anchorElement = {inputRef.current}
				{...menuProps}
				style = {menuCss}
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