/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ThemeColourFunction, useDarkMode, useTheme, useThemeColours } from "../../../../styles";

const XComponent = styled.div<{$large?: boolean, $radiusSmall: string, $isDark: boolean, $colour: ThemeColourFunction}>
`
	position: relative;
	width: ${props => props.$large ? 15 : 10}px;
	height: ${props => props.$large ? 15 : 10}px;
	cursor: pointer;

	&:before, &:after
	{
		content: "";
		position: absolute;
		width: 1px;
		height: 100%;
		background-color: ${props => props.$colour (props.$isDark ? "white" : "black")};
		border-radius: ${({$radiusSmall}) => $radiusSmall};
		left: calc(50% - 1px);
	}

	&:before
	{
		transform: rotate(45deg);
	}
	
	&:after
	{
		transform: rotate(-45deg);
	}
`;

interface XProps
{
	large?: boolean;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function X ({large, onClick}: XProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();
	const {theme} = useTheme();
	const {radius} = theme.measurements;
	
	return (
		<XComponent
			$radiusSmall = {radius.small}
			$large = {large}
			onClick = {onClick}
			$isDark = {isDark}
			$colour = {colour}
		/>
	);
}