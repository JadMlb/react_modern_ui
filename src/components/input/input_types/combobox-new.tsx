import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ComboboxProps } from "../../../types/components/Combobox/ComboboxProps";
import InputBase from "./input_base";
import { ParserFactory } from "../../../types/components/styles/generic/ParserFactory";
import { spacing, useDarkMode, useThemeColours } from "../../../styles";
import { Parser } from "../../../types/components/styles/generic/Parser";
import { BoxStyle } from "../../../types/components/styles/box/BoxStyle";
import Menu from "../menu";
import ComboboxOption from "./combo_components/option";
import { Option } from "../../../types";
import Tag from "../../state/tag";
import X from "./combo_components/x";

function Arrow ({up}: {up?: boolean})
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	const parserFactory = new ParserFactory (colour);
	const css = (parserFactory.getParser("") as Parser<BoxStyle>).parse ({
		width: "7px",
		height: "7px",
		borderBottom: {
			color: isDark ? "white" : "black",
			style: "solid",
			width: "2px"
		},
		borderRight: {
			color: isDark ? "white" : "black",
			style: "solid",
			width: "2px"
		},
		transform: `translate(-${spacing.small}, ${up ? "" : "-"}1.75px) rotate(${up ? -13 : 4}5deg)`
	});

	return (
		<div css = {css}/>
	);
}

const DEFAULT_ARROW_COMPONENT = {
	open: <Arrow up/>,
	closed: <Arrow/>
};

export default function Combobox ({id, className, name, options, label, value, hint, leading, readonly, disabled, hideLabel, position, optional, style, arrowComponent = DEFAULT_ARROW_COMPONENT, onChange}: ComboboxProps)
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

	const formattedValue = useMemo (
		() =>
		{
			if (Array.isArray (value))
				return value.map (
					v => <Tag
							onClick = {
								e =>
								{
									e.stopPropagation();
									const option = getSelected (v);
									if (option)
										handleChange (null, option);
								}
							}
						>
							{v} <X/>
						</Tag>
				);
			return value;
		},
		[value, getSelected]
	);

	function isFromTop ()
	{
		if (position)
			return position === "top";
			
		if (inputRef.current)
		{
			const {top} = inputRef.current.getBoundingClientRect();
			const {offsetHeight} = inputRef.current;
			if (window.innerHeight - top - offsetHeight <= 200)
				return true;
		}

		return false;
	}

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
		<InputBase
			id = {id}
			className = {className}
			inputId = {`combo-${name}`}
			ref = {inputRef}
			label = {label}
			trailing = {
				<div style = {{display: "flex", gap: spacing.large, alignItems: "center"}}>
					{optional && <X large onClick = {e => {e.stopPropagation(); onChange?. (null, null);}}/>}
					{arrowComponent[isExpanded ? "open" : "closed"]}
				</div>
			}
			hint = {hint}
			hideLabel = {hideLabel}
			style = {style}
			onFocus = {expand}
			onBlur = {close}
		>
			{leading}
			{formattedValue}
			<Menu
				isOpen = {!disabled && isExpanded}
				onClose = {() => setIsExpanded (false)}
				position = {isFromTop() ? "top" : "bottom"}
				anchorElement = {inputRef.current}
			>{
				Array.isArray (options) ?
					options.map (
						o => <ComboboxOption
								key = {o.value}
								option = {o}
								selected = {Array.isArray (value) && value.findIndex (v => v === o.value) > -1 || value === o.value}
								onClick = {option => handleChange (null, option)}
							/>
					) :
					Object.entries (options)
							.map (
								category => <>
										<small>{category[0]}</small>
										{
											category[1].map (
												o => <ComboboxOption
														key = {o.value}
														option = {o}
														selected = {Array.isArray (value) && getSelected (o.value) !== undefined || value === o.value}
														onClick = {option => handleChange (null, option)}
													/>
											)
										}
									</>
							)
			}</Menu>
		</InputBase>
	);
}