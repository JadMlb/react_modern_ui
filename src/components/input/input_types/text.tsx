/** @jsxImportSource @emotion/react */
import * as React from "react";
import { ThemeColourFunction, useDarkMode, useTheme, useThemeColours } from "../../../styles";
import styled from "@emotion/styled";
import SingleLineTextInputProps from "../../../types/components/input/text/SingleLineTextInputProps";
import MultiLineTextInputProps from "../../../types/components/input/text/MultiLineTextInputProps";
import NonTextTextualInputProps from "../../../types/components/input/text/NonTextTextualInputProps";
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
	type: NonTextTextualInputProps["type"] | "text";
	displayType: NonTextTextualInputProps["type"] | "text";
	handleDisplayChange: () => void;
	optional?: boolean;
	handleClear?: () => void;
	multiline?: boolean;
	maxCharCount?: number;
	shownValue: string;
	displayLength?: boolean;
	children?: React.ReactNode;
}

function Trailing ({type, displayType, handleDisplayChange, optional, handleClear, multiline, maxCharCount, shownValue, displayLength, children}: TrailingProps)
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

	if (
		(type !== "text" || !multiline || maxCharCount === undefined || !displayLength) &&
		type !== "password" &&
		!optional &&
		!children
	)
		return null;
	
	return (
		<div style = {WRAPPER_STYLE}>
			{children}
			{
				type === "text" && multiline && maxCharCount !== undefined && displayLength &&
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

const TextInput = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, SingleLineTextInputProps | MultiLineTextInputProps | NonTextTextualInputProps> (
	(props, ref) =>
	{
		const {
			id,
			className,
			name,
			label,
			labelStyle,
			type,
			value,
			defaultValue,
			placeholder,
			leading,
			trailing,
			fieldsetStyle,
			style,
			readonly,
			disabled,
			optional,
			hideLabel,
			hint,
			textOnError,
			isError,
			pattern,
			autoComplete,
			autoFocus,
			form,
			minLength,
			maxLength,
			displayLength,
			inputMode,
			onChange,
			onBlur,
			onFocus,
			onKeyDown,
			onKeyUp,
			onContextMenu
		} = props;
		
		const [shownValue, setShownValue] = React.useState (value ?? "");
		const [displayType, setDisplayType] = React.useState (type);

		function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
		{
			try
			{	
				if ((type !== "text" || !props.multiline) && pattern)
				{
					const regex = new RegExp (pattern);
					if (!regex.test (e.target.value))
						return;
				};

				if (!value)
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
						maxCharCount = {maxLength}
						shownValue = {shownValue}
						displayLength = {displayLength}
					>
						{trailing}
					</Trailing>
				}
				isError = {isError}
				style = {style}
				fieldsetStyle = {fieldsetStyle}
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
						placeholder = {placeholder}
						defaultValue = {defaultValue}
						value = {shownValue}
						onChange = {handleChange}
						wrap = {props.wrap ?? "soft"}
						minLength = {minLength}
						maxLength = {maxLength}
						autoComplete = {autoComplete}
						autoCorrect = {props.autoCorrect}
						autoFocus = {autoFocus}
						form = {form}
						readOnly = {readonly}
						disabled = {disabled}
						onBlur = {onBlur}
						onFocus = {onFocus}
						onKeyDown = {onKeyDown}
						onKeyUp = {onKeyUp}
						onContextMenu = {onContextMenu}
					/> :
					<StyledTextInput
						ref = {ref as React.ForwardedRef<HTMLInputElement>}
						id = {`${name}-${type}-input`}
						name = {name}
						type = {displayType}
						placeholder = {placeholder}
						defaultValue = {defaultValue}
						value = {shownValue}
						onChange = {handleChange}
						minLength = {minLength}
						maxLength = {maxLength}
						pattern = {pattern}
						autoComplete = {autoComplete}
						autoCorrect = {props.type === "text" ? props.autoCorrect : undefined}
						autoFocus = {autoFocus}
						form = {form}
						inputMode = {inputMode}
						readOnly = {readonly}
						disabled = {disabled}
						onBlur = {onBlur}
						onFocus = {onFocus}
						onKeyDown = {onKeyDown}
						onKeyUp = {onKeyUp}
						onContextMenu = {onContextMenu}
					/>
				}
			</InputBase>
		);
	}
);

export default TextInput;