/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { radius, spacing } from "../../styles/styles";
import { Style, ThemeColourFunction, useDarkMode, useThemeColours, useThemeParser } from "../../styles/theme";
import { ProgressBarProps } from "../../types/components/ProgressBar/ProgressBarProps";
import { useEffect, useState } from "react";

const Bar = styled.div<{$percentage: number, $getColour: ThemeColourFunction}>
`
	height: 100%;
	width: ${props => props.$percentage}%;
	
	background-color: ${props => props.$getColour ("primary")};;
	border-radius: ${radius.normal};

	transition: width 100ms;
`;

const BarContainer = styled.div<{$thin?: boolean, $isDark: boolean, $getColour: ThemeColourFunction}>
`
	position: relative;
	width: 100%;
	height: ${props => props.$thin ? 3 : 10}px;
	background-color: ${props => props.$getColour (props.$isDark ? "grayDark" : "grayLight")};
	border-radius: ${radius.normal};
`;

const Container = styled.div<{$thin?: boolean}>
`
	width: 100%;

	display: grid;
	grid-template-columns: 1fr ${props => !props.$thin && `30px`};
	align-items: center;
	gap: ${spacing.small};
`;

/** Renders a progress bar with given percentage */
export default function ProgressBar ({id, className, percentage, showPercentage, thin, style, parentStyle, backgroundStyle}: ProgressBarProps)
{
	const isDark = useDarkMode();
	const getColour = useThemeColours();

	const parseTheme = useThemeParser();

	const [parentCss, setParentCss] = useState<Style> ({});
	const [bgCss, setBgCss] = useState<Style> ({});
	const [css, setCss] = useState<Style> ({});
	
	if (percentage < 0 || percentage > 100)
		throw new Error (`The percentage of a ProgressBar must be between 0 and 100, received ${percentage}.`);

	useEffect (
		() =>
		{
			if (style)
				setCss (parseTheme (style));
		},
		[style, parseTheme]
	);
	
	useEffect (
		() =>
		{
			if (parentStyle)
				setParentCss (parseTheme (parentStyle));
		},
		[parentStyle, parseTheme]
	);
	
	useEffect (
		() =>
		{
			if (backgroundStyle)
				setBgCss (parseTheme (backgroundStyle));
		},
		[backgroundStyle, parseTheme]
	);

	return (
		<Container $thin = {thin} css = {parentCss}>
			<BarContainer
				$isDark = {isDark}
				$getColour = {getColour}
				$thin = {thin}
				css = {bgCss}
			>
				<Bar
					$percentage = {percentage}
					$getColour = {getColour}
					css = {css}
					className = {className}
					id = {id}
				/>
			</BarContainer>
			{
				!thin && showPercentage && (percentage + "%")
			}
		</Container>
	);
}