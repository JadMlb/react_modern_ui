import React from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { colour, radius, spacing } from "../../styles/styles";
import { useDarkMode, useTheme } from "../../styles/theme";
import { ThemeType } from "../../types/theme";

const ShineAnimation = keyframes
`
	from
	{
		right: 100%;
	}

	to
	{
		right: 0;
	}
`;

const LoaderContainer = styled.div<{$isDark: boolean, $theme: ThemeType}>
`
	display: flex;
	flex-direction: column;
	gap: ${spacing.xsmall};
	position: relative;

	&:before
	{
		content: "";
		display: block;
		position: absolute;
		right: -100%;

		background-color: ${props => colour (props.$isDark ? "black" : "white", props.$theme)}99;
		
		width: 10%;
		height: 100%;
		clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);

		animation: ${ShineAnimation} 3s ease-in-out infinite;
	}
`;

const SkeletonLoaderLine = styled.div<{$isDark: boolean, $width: number, $theme: ThemeType}>
`
	height: 20px;
	width: ${props => props.$width * 100}%;
	border-radius: ${radius.small};
	background-color: ${props => colour (props.$isDark ? "grayDark" : "grayLight", props.$theme)};
`;

/**
 * Renders a loading animation mimicking lines of text
 */
export default function SkeletonLoader ()
{
	const {theme} = useTheme();
	const isDark = useDarkMode();

	return (
		<LoaderContainer $isDark = {isDark} $theme = {theme}>
			<SkeletonLoaderLine $width = {0.5} $isDark = {isDark} $theme = {theme}/>
			<SkeletonLoaderLine $width = {Math.random()} $isDark = {isDark} $theme = {theme}/>
			<SkeletonLoaderLine $width = {Math.random()} $isDark = {isDark} $theme = {theme}/>
			<SkeletonLoaderLine $width = {Math.random()} $isDark = {isDark} $theme = {theme}/>
			<SkeletonLoaderLine $width = {Math.random()} $isDark = {isDark} $theme = {theme}/>
			<SkeletonLoaderLine $width = {Math.random()} $isDark = {isDark} $theme = {theme}/>
		</LoaderContainer>
	);
}