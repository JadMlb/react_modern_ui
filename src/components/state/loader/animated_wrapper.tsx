import { useMemo } from "react";
import { useDarkMode, useThemeParser } from "../../../styles";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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

const LoaderContainer = styled.div
`
	position: relative;

	&:before
	{
		content: "";
		display: block;
		position: absolute;
		right: -100%;
		
		width: 10%;
		height: 100%;
		clip-path: polygon(25% 0, 100% 0, 75% 100%, 0 100%);

		animation: ${ShineAnimation} 3s ease-in-out infinite;
	}
`;

interface AnimatedLoaderWrapperProps
{
	className?: string;
	id?: string;
	children?: React.ReactNode;
}

/**
 * position: relative;

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
 */

export default function AnimatedLoaderWrapper ({id, className, children}: AnimatedLoaderWrapperProps)
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const css = useMemo (
		() => parseCss ({
			"&:before": {
				backgroundColor: `color(from ${isDark ? "black" : "white"} srgb r g b / 0.3)`,
			}
		}),
		[parseCss, isDark]
	);
	
	return (
		<LoaderContainer css = {css} className = {className} id = {id}>
			{children}
		</LoaderContainer>
	);
}