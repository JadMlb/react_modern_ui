import React from "react";
import styled, { css } from "styled-components";
import { colour, radius, spacing } from "../../styles/styles";
import { useDarkMode, useTheme } from "../../styles/theme";
import ThemeType from "../../types/theme";

const Bar = styled.div<{$percentage: number, $thin?: boolean}>
`
	height: 100%;
	min-height: ${props => props.$thin ? 3 : 10}px;
	width: ${props => props.$percentage}%;
	
	background-color: black;
	border-radius: ${radius.normal};

	transition: width 100ms;
`;

const BarContainer = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	position: relative;
	width: 100%;
	background-color: ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
	border-radius: ${radius.normal};

	> ${Bar}
	{
		background-color: ${props => colour ("primary", props.$theme)};
	}
`;

const Container = styled.div<{$thin?: boolean}>
`
	min-height: 10px;
	width: 100%;

	display: grid;
	grid-template-columns: 1fr ${props => !props.$thin && css `30px`};
	align-items: center;
	gap: ${spacing.small};
`;

type ProgressBarProps = {
	percentage: number,
	thin?: boolean,
	showPercentage?: boolean
};

export default function ProgressBar ({percentage, showPercentage, thin}: ProgressBarProps)
{
	const {theme} = useTheme();
	const isDark = useDarkMode();
	
	if (percentage < 0 || percentage > 100)
		throw new Error (`The percentage of a ProgressBar must be between 0 and 100, received ${percentage}.`);

	return (
		<Container $thin = {thin}>
			<BarContainer $isDark = {isDark} $theme = {theme}>
				<Bar $percentage = {percentage} $thin = {thin}/>
			</BarContainer>
			{
				!thin && showPercentage && (percentage + "%")
			}
		</Container>
	);
}