/** @jsxImportSource @emotion/react */
import * as React from "react";
import { ThemeColourFunction, useDarkMode, useTheme, useThemeColours } from "../../../styles";
import styled from "@emotion/styled";
import SingleLineTextInputProps from "../../../types/components/input/text/SingleLineTextInputProps";
import MultiLineTextInputProps from "../../../types/components/input/text/MultiLineTextInputProps";
import EmailInputProps from "../../../types/components/input/text/EmailInputProps";
import PasswordInputProps from "../../../types/components/input/text/PasswordInputProps";
import InputBase from "./input_base";
import X from "./combobox/x";

const StyledTextInput = styled.input
`
	all: unset;
	font: inherit;
	width: 100%;
`;

const StyledTextArea = styled.textarea
`
	all: unset;
	font: inherit;
	width: 100%;
	resize: vertical;
`;

const Small = styled.small<{$isDark: boolean, $colour: ThemeColourFunction}>
`
	color: ${props => props.$colour ("gray")};
`;

const ShowHide = styled.div<{$shown: boolean, $isDark: boolean, $spacingSmall: string, $radiusRound: string, $colour: ThemeColourFunction}>
`
	margin-inline: ${({$spacingSmall}) => $spacingSmall};
	cursor: pointer;
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:before
	{
		content: "";
		display: block;
		width: 15px;
		height: 10px;
		border: 1px solid ${props => props.$colour (props.$isDark ? "white" : "black")};
		border-radius: ${({$radiusRound}) => $radiusRound};
	}

	&:after
	{
		content: "";
		position: absolute;
		display: block;
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
		transition: .25s;
		${
			props => props.$shown ?
				`
					width: 2px;
					height: 20px;
					transform: rotate(45deg);
				`
				:
				`
					width: 7px;
					height: 7px;
					border-radius: ${props.$radiusRound};
				`
		}
	}
`;

interface TrailingProps
{
	type: "text" | "password" | "email";
	displayType: "text" | "password" | "email";
	handleDisplayChange: () => void;
	optional?: boolean;
	handleClear?: () => void;
	multiline?: boolean;
	maxCharCount?: number;
	shownValue: string;
	children?: React.ReactNode;
}

function Trailing ({type, displayType, handleDisplayChange, optional, handleClear, multiline, maxCharCount, shownValue, children}: TrailingProps)
{
	const {theme} = useTheme();
	const {spacing, radius} = theme.measurements;
	const isDark = useDarkMode();
	const colour = useThemeColours();

	const WRAPPER_STYLE = React.useMemo (
		() => ({
			display: "flex",
			gap: spacing.small,
			alignItems: "center"
		}),
		[spacing.small]
	);
	
	return (
		<div style = {WRAPPER_STYLE}>
			{children}
			{
				type === "text" && multiline && maxCharCount !== undefined &&
					<Small $isDark = {isDark} $colour = {colour}>{shownValue.length}/{maxCharCount}</Small>
			}
			{
				type === "password" &&
				<ShowHide
					$spacingSmall = {spacing.small}
					$radiusRound = {radius.round}
					$shown = {displayType === "text"}
					$isDark = {isDark}
					$colour = {colour}
					onClick = {handleDisplayChange}
				/>
			}
			{optional && <X onClick = {handleClear}/>}
		</div>
	);
}

export default function TextInput (props: SingleLineTextInputProps | MultiLineTextInputProps | EmailInputProps | PasswordInputProps)
{
	const {
		id,
		className,
		ref,
		name,
		label,
		labelStyle,
		type,
		value,
		leading,
		trailing,
		style,
		onChange,
		readonly,
		disabled,
		optional,
		hideLabel,
		hint,
		textOnError,
		isError
	} = props;
	
	const [shownValue, setShownValue] = React.useState (value ?? "");
	const [displayType, setDisplayType] = React.useState (type);

	function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
	{
		try
		{
			setShownValue (e.target.value);
			if (onChange)
				onChange (e, e.target.value);
		}
		catch {}
	}

	function handleClear ()
	{
		setShownValue ("");
		onChange?. (null, "");
	}

	React.useEffect (
		() => {setShownValue (value ?? "")},
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
					type = {type}
					displayType = {displayType}
					handleDisplayChange = {() => setDisplayType (old => old === "password" ? "text" : "password")}
					optional = {optional}
					handleClear = {handleClear}
					multiline = {(type === "text" && props.multiline) ?? false}
					maxCharCount = {type === "text" ? props.maxCharCount : undefined}
					shownValue = {shownValue}
				>
					{trailing}
				</Trailing>
			}
			isError = {isError}
			style = {style}
			disabled = {disabled}
			readonly = {readonly}
		>
			{leading}
			{
				type === "text" && props.multiline ?
				<StyledTextArea
					ref = {ref as React.ForwardedRef<HTMLTextAreaElement>}
					id = {`${name}-${type}-input`}
					name = {name}
					rows = {props.rows ?? 2}
					value = {shownValue}
					onChange = {handleChange}
					maxLength = {props.maxCharCount}
					readOnly = {readonly}
					disabled = {disabled}
				/> :
				<StyledTextInput
					ref = {ref as React.ForwardedRef<HTMLInputElement>}
					id = {`${name}-${type}-input`}
					name = {name}
					type = {displayType}
					value = {shownValue}
					onChange = {handleChange}
					maxLength = {type === "text" ? props.maxCharCount : undefined}
					readOnly = {readonly}
					disabled = {disabled}
				/>
			}
		</InputBase>
	);
}