import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComboboxArrow, ComboboxProps } from "../../../../types/components/Combobox/ComboboxProps";
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
import Chevron from "../../../chevron";
import { merge } from "lodash";

function getDefaultArrowComponent (colour?: string, forceMode?: "light" | "dark"): ComboboxArrow
{
	return {
		open: <Chevron orientation = "up" colour = {colour} forceMode = {forceMode}/>,
		closed: <Chevron colour = {colour} forceMode = {forceMode}/>
	};
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

export default function Combobox (instanceProps: ComboboxProps)
{
	const props = useProps ("combobox", instanceProps);
	const {
		name,
		options,
		labelStyle,
		value,
		hintStyle,
		leading,
		readOnly,
		disabled,
		menuProps,
		optional,
		style,
		fieldsetStyle,
		arrowComponent,
		defaultArrowComponentColour,
		menuStyle,
		tagsStyle,
		errorTextStyle,
		onChange,
		renderOption = defaultRenderOption,
		forceMode,
		...baseProps
	} = props;

	const finalArrowComponent: ComboboxArrow = useMemo (
		() => merge ({}, getDefaultArrowComponent (defaultArrowComponentColour, forceMode), arrowComponent),
		[arrowComponent, defaultArrowComponentColour, forceMode]
	);

	const css = useStyle ("combobox", props, style);
	const fieldsetCss = useStyle ("combobox", props, fieldsetStyle, "fieldsetStyle");
	const labelCss = useStyle ("combobox", props, labelStyle, "labelStyle");
	const hintCss = useStyle ("combobox", props, hintStyle, "hintStyle");
	const errorCss = useStyle ("combobox", props, errorTextStyle, "errorTextStyle");
	const menuCss = useStyle ("combobox", props, menuStyle, "menuStyle");
	const tagCss = useStyle ("combobox", props, tagsStyle, "tagsStyle");
	
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
											if (!readOnly && !disabled)
												handleChange (null, option);
										}
									}
									style = {tagCss}
								>
									{option.display} {!readOnly && !disabled && <X/>}
								</Tag>;
					}
				)
				.filter (v => v !== undefined);

			return getSelected(value)?.display;
		},
		[getSelected, tagCss]
	);

	const formattedValue = useMemo (
		() =>
		{
			if (value)
				return formatValue (value);
			return undefined;
		},
		[formatValue, value, readOnly, disabled]
	);

	function expand (e: React.SyntheticEvent)
	{
		e.stopPropagation();
		setIsExpanded (!disabled && !readOnly);
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
						arrowComponent = {finalArrowComponent}
						expanded = {isExpanded}
						optional = {optional}
						value = {value}
						readonly = {readOnly}
						disabled = {disabled}
						onChange = {onChange}
					/>
				}
				style = {css}
				onClick = {expand}
				disabled = {disabled}
				readOnly = {readOnly}
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
					readonly = {readOnly}
					onClick = {handleChange}
					value = {value}
				/>
			</Menu>
		</>
	);
}