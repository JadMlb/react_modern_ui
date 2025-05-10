import styled from "@emotion/styled";
import { radius, spacing, useDarkMode, useThemeColours } from "../../styles";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { Parser } from "../../types/components/styles/generic/Parser";
import { BoxStyle } from "../../types/components/styles/box/BoxStyle";
import { useRef } from "react";

const Container = styled.div<{$open?: boolean, $position?: "top" | "bottom", $css: string}>
`
	display: ${props => props.$open ? "block" : "none"};
	border-radius: ${radius.small};
	padding: ${spacing.small};
	position: absolute;
	${props => props.$position === "bottom" ? "top" : "bottom"}: calc(100% + ${spacing.small});
	left: 0;
	width: calc(100% - 2 * ${spacing.small});
	z-index: 99999;
	${props => props.$css}
`;

interface MenuProps 
{
	isOpen?: boolean;
	children?: React.ReactNode;
	position?: "top" | "bottom";
	onClose?: () => void;
}

export default function Menu ({isOpen, children,  position = "bottom"}: MenuProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	const parserFactory = new ParserFactory (colour);
	const css = (parserFactory.getParser("") as Parser<BoxStyle>).parse ({
		border: {
			color: "gray",
			style: "solid",
			width: "1px"
		},
		backgroundColor: `gray${isDark ? "Dark" : "Light"}`
	});

	const ref = useRef<HTMLDivElement> (null);

	return (
		<>{
			isOpen &&
				<Container
					$open = {isOpen}
					$css = {css}
					$position = {position}
					ref = {ref}
				>
					{children}
				</Container>
		}</>
	);
}