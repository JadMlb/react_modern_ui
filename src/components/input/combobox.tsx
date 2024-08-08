import { useState, useEffect, useRef } from "react";
import { css, styled } from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import {Option} from "../../types/Option";
import Button from "./button";
import ThemeType from "../../types/theme";
import { useDarkMode, useTheme } from "../../styles/theme";
import React from "react";

const Container = styled.div<{$white?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	position: relative;
	text-align: start;

	cursor: pointer;

	background-color: ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	border-radius: ${radius.normal};
	border: 2px solid ${props => colour (props.$isDark ? "primaryDark" : "primaryElevated", props.$theme)};

	&:after
	{
		content: "";
		display: block;
		position: absolute;
		width: 7px;
		height: 7px;
		border-bottom: 2px solid ${props => colour (props.$isDark ? "white" : "black", props.$theme)};
		border-right: 2px solid ${props => colour (props.$isDark ? "white" : "black", props.$theme)};
		right: ${spacing.xsmall};
		top: calc(50% - 7px/1.4);
		transform: rotate(45deg);
	}

	> button:last-child
	{
		font-size: 9pt;
		position: absolute;
		right: calc(${spacing.xsmall} + 7px * 1.4 + 9pt);
		top: calc(50% - 7px/1.4);
	}
`;

const SelectionLabel = styled.div
`
	padding: ${spacing.xsmall};
	margin-right: calc(${spacing.small} + 9px * 1.4 + 1px);
	display: flex;
	align-items: center;
	gap: ${spacing.xsmall};
	flex-wrap: wrap;
	user-select: none;
`;

const OptionsList = styled.div<{$hidden?: boolean, $white?: boolean, $isDark: boolean, $fromTop?: boolean, $theme: ThemeType}>
`
	position: absolute;
	z-index: 999;
	${props => props.$fromTop && css `bottom: 100%;`}
	width: calc(100% - 2 * ${spacing.xsmall});
	max-height: 200px;
	overflow: auto;
	padding: ${spacing.xsmall};

	display: flex;
	flex-direction: column;

	background-color: ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	border: 1px solid ${props => colour ("gray", props.$theme)};
	border-radius: calc(2 * ${radius.small});

	display: ${props => props.$hidden ? "none" : "flex"};
	flex-direction: column;
	gap: calc(${spacing.xsmall} / 2);
`;

const OptionItem = styled.div<{$selected?: boolean, $isDark: boolean, $theme: ThemeType}>
`
	all: unset;
	font: inherit;

	padding: ${spacing.xsmall};
	border-radius: ${radius.small};

	${
		props =>
			props.$selected && css`background-color: ${colour (props.$isDark ? "accentDark" : "accent", props.$theme)};`
	}

	&:hover
	{
		background-color: ${props => colour ("primary", props.$theme)};
		color: ${props => colour ("white", props.$theme)};
	}
`;

const SearchOptionsField = styled.input<{$isDark: boolean, $theme: ThemeType}>
`
	font: inherit;

	position: sticky;
	top: 0;

	padding: calc(${spacing.xsmall} / 2) ${spacing.xsmall};
	border-radius: ${radius.small};

	background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)};
	color: ${props => colour (props.$isDark ? "white" : "black", props.$theme)};
`;

const Label = styled.span<{$isDark: boolean, $theme: ThemeType}>
`
	position: absolute;
	transform: translateY(-50%);
	margin-left: calc(${spacing.small} - ${spacing.xsmall} / 2);
	padding-left: calc(${spacing.xsmall} / 2);
	padding-right: ${spacing.xsmall};
	font-size: 9pt;
	font-weight: bold;
	color: ${props => colour (props.$isDark ? "primaryElevated" : "primary", props.$theme)};
	background-image: linear-gradient(to bottom, ${props => colour (props.$isDark ? "black" : "white", props.$theme)} 50%, ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)} 50%);
`;

type ComboboxProps = {
	/**
	 * Key of the ComboBox
	 */
	key?: string | number | bigint | null,
	/**
	 * The label to be displayed inside of the selection panel. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized.
	 */
	label?: string,
	/**
	 * The name of the field that contains the value of this selection. If no label is provided, the provided `name` property will be used as a label with the first letter capitalized. 
	 */
	name: string,
	/**
	 * The list of options to offer for selection
	 */
	from: Option[],
	/**
	 * The active selected values, represented by a list of their IDs. Even if multiple choices is not enabled, the values should be in an array.
	 */
	values: number[],
	/**
	 * The change event handler fired when a new value is selected. It exposes all of the selected options so they can be displayed.
	 * @param options The list of all currently selected options
	 */
	onChange: (options: Option[]) => void,
	/**
	 * Specifies whether the ComboBox is in multiple selection mode, supporting multiple options. Defaults to `false`.
	 */
	multiple?: boolean,
	/**
	 * Hides the search bar in the options list. Defaults to `false`.
	 */
	notSearchable?: boolean,
	/**
	 * Hides the label of the ComboBox. Defaults to `false`.
	 */
	compact?: boolean,
	/**
	 * Automatically selects the first option in the options list and fires the event handler. Defaults to `false`.
	 */
	defaultFirst?: boolean,
	/**
	 * Specifies whether the value of the ComboBox is required and hides the clear button upon selection. Defaults to `false`.
	 */
	required?: boolean
};

/**
 * Renders a ComboBox, i.e. a drop-down list of options to select one or more options (`multiple` flag). The list of options is passed via the property `from`.
 */
export default function ComboBox ({name, label, from, multiple, values, onChange, notSearchable = false, compact, defaultFirst, required}: ComboboxProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();
	const [isHidden, setIsHidden] = useState (true);
	const [options, setOptions] = useState<Option[]> ([]);
	const [allOptions, setAllOptions] = useState<Option[]> ([]);
	const [selection, setSelection] = useState<Option[]> ([]);
	const [searchBy, setSearchBy] = useState ("");
	const inputRef = useRef<HTMLDivElement> (null);
	const searchRef = useRef<HTMLInputElement> (null);
	
	async function getOptions ()
	{
		setAllOptions (from);
		setOptions (from);
		setSelection (
			from.filter (o => values?.includes (o.id))
		);
	}

	function filterOptions (e: React.ChangeEvent<HTMLInputElement>)
	{
		setSearchBy (e.target.value);
		
		let filtered = allOptions;
		
		if (e.target.value !== "")
			filtered = allOptions.filter (opt => opt.text.toLowerCase().includes (e.target.value.toLowerCase()));

		setOptions (filtered);
	}

	function updateSelection (opt: Option)
	{
		let newSelection: Option[] = [];

		if (multiple)
			if (isSelected (opt))
				newSelection = selection.filter (o => o.id !== opt.id);
			else
				newSelection = [...selection, opt];
		else
			newSelection = [opt];

		setSelection (newSelection);
		setIsHidden (true);
		onChange (newSelection);
	}

	function removeSelectedValue (id: number)
	{
		let newSelection = selection.filter (v => v.id != id);
		setSelection (newSelection);
		onChange (newSelection);
	}

	function isSelected (option: Option)
	{
		if (multiple)
			return selection.filter(o => o.id === option.id).length > 0;

		return selection && selection.length > 0 && selection[0].id === option.id;
	}

	function clear ()
	{
		setSelection ([]);
		onChange ([]);
	}

	useEffect (() => {if (options.length === 0) getOptions();}, [values]);

	useEffect (
		() =>
		{
			if (options.length > 0 && defaultFirst)
			{
				setSelection ([options[0]]);
				onChange ([options[0]]);
			}
		},
		[options]
	);

	useEffect (
		() =>
		{
			function handleClickOutsideSelect (e: MouseEvent)
			{
				if (inputRef.current && !inputRef.current.contains (e.target as Element))
					setIsHidden (true);
			}

			window.addEventListener ("click", handleClickOutsideSelect);

			return () => window.removeEventListener ("click", handleClickOutsideSelect);
		}
	);

	useEffect (
		() =>
		{
			setSearchBy ("");
			if (!isHidden && searchRef.current)
				searchRef.current.focus();
		},
		[isHidden]
	);

	function isFromTop ()
	{
		if (inputRef.current)
		{
			const {top} = inputRef.current.getBoundingClientRect();
			const {offsetHeight} = inputRef.current;
			if (window.innerHeight - top - offsetHeight <= 200)
				return true;
		}

		return false;
	}
	
	return (
		<Container $isDark = {isDark} $theme = {theme}>
			{
				selection && selection.length > 0 && !compact &&
					<Label
						$isDark = {isDark}
						$theme = {theme}
					>
						{label ?? (name[0].toUpperCase() + name.slice (1))}
					</Label>
			}
			<SelectionLabel ref = {inputRef} onClick = {() => setIsHidden (old => !old)}>
				{
					selection && selection.length > 0 ?
						multiple ?
							selection.map (
								value => <SelectedOption
											option = {value.text}
											remove = {
												e =>
												{
													e.stopPropagation();
													removeSelectedValue (value.id);
												}
											}
										/>
							)
							:
							`${selection[0].text}`
						:
						(label ?? name)
				}
			</SelectionLabel>
			{
				!isHidden &&
				<OptionsList $isDark = {isDark} $theme = {theme} $fromTop = {isFromTop()}>
					{
						!notSearchable &&
							<SearchOptionsField
								$isDark = {isDark}
								$theme = {theme}
								type = "text"
								value = {searchBy}
								onChange = {filterOptions}
								ref = {searchRef}
							/>
					}
					{
						options.map (
							o => <OptionItem
									$isDark = {isDark}
									 $theme = {theme}
									$selected = {isSelected (o)}
									onClick = {() => updateSelection (o)}
									key = {o.id}
								>
									{o.text}
								</OptionItem>
						)
					}
				</OptionsList>
			}
			{
				selection.length > 0 && !required && 
					<Button
						role = "transparent"
						onClick = {clear}
					>
						&#x2715;
					</Button>
			}
		</Container>
	);
}

const Tag = styled.div
`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: ${spacing.xsmall};
	padding: 3px;
	background-color: #ddd;
	border-radius: ${radius.small};
`;

const RemoveButton = styled.div
`
	&:after
	{
		content: "\u2715";
		font-weight: bold;
		font-size: .9rem;
		text-align: center;
		margin: unset;
		padding: unset;
	}
`;

type SelectedOptionProps = {
	option: string,
	remove: React.MouseEventHandler
};

function SelectedOption ({option, remove}: SelectedOptionProps)
{
	return (
		<Tag>
			{option}
			<RemoveButton onClick = {remove}/>
		</Tag>
	);
}