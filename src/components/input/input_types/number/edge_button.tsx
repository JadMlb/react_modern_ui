/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import styled from "@emotion/styled";
import { Style } from "../../../../types";
import Button from "../../button";
import { useDarkMode, useThemeColours } from "../../../../styles";

const Dash = styled.div<{$colour: string}>
`
	position: relative;
	width: 25px;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${({$colour}) => $colour};
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

const Plus = styled.div<{$colour: string}>
`
	position: relative;
	width: 100%;
	height: auto;
	aspect-ratio: 1 / 1;
	&:before, &:after
	{
		display: block;
		position: absolute;
		content: "";
		background-color: ${({$colour}) => $colour};
	}
	
	&:before
	{
		width: 1px;
		height: 100%;
		right: calc(50% - 0.5px);
	}

	&:after
	{
		height: 1px;
		width: 100%;
		top: calc(50% - 0.5px);
	}
`;

interface EdgeButtonProps
{
	dec?: boolean;
	disabled?: boolean;
	onChange?: () => void;
}

const EDGE_BUTTON_STYLE = {
	width: "25px",
	height: "25px",
	borderRadius: "radius.small"
} satisfies Style;

export default function EdgeButton ({disabled, dec, onChange}: EdgeButtonProps)
{
	const isDark = useDarkMode();
	const getColour = useThemeColours();
	const colour = useMemo (
		() => getColour (isDark ? "white" : "black"),
		[getColour, isDark]
	);
	
	return (
		<Button
			style = {EDGE_BUTTON_STYLE}
			onClick = {!disabled ? onChange : undefined}
			disabled = {disabled}
			type = "outlined"
		>{
			dec ?
				<Dash $colour = {colour}/> :
				<Plus $colour = {colour}/>
		}</Button>
	);
}