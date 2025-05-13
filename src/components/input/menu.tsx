import styled from "@emotion/styled";
import { radius, spacing, useDarkMode, useThemeColours } from "../../styles";
import { ParserFactory } from "../../types/components/styles/generic/ParserFactory";
import { Parser } from "../../types/components/styles/generic/Parser";
import { BoxStyle } from "../../types/components/styles/box/BoxStyle";
import { useMemo, useRef } from "react";
import useMenuPosition from "../../hooks/useMenuPosition";

const Container = styled.div<{$fitContent?: boolean, $open?: boolean, $position?: "top" | "bottom", $css: string}>
`
	display: ${props => props.$open ? "block" : "none"};
	border-radius: ${radius.small};
	padding: ${spacing.small};
	position: absolute;
	${props => props.$position === "bottom" ? "top" : "bottom"}: calc(100% + ${spacing.small});
	left: 0;
	${props => !props.$fitContent && `min-width: calc(100% - 2 * ${spacing.small});`}
	width: fit-content;
	z-index: 99999;
	${props => props.$css}
`;

interface MenuProps 
{
	anchorElement: HTMLElement | null;
	isOpen?: boolean;
	children?: React.ReactNode;
	position?: "top" | "bottom";
	fitContent?: boolean;
	onClose?: () => void;
}

export default function Menu ({anchorElement, isOpen, children, position, fitContent}: MenuProps)
{
	const isDark = useDarkMode();
	const colour = useThemeColours();
	const parserFactory = new ParserFactory (colour);
	const css = useMemo (
		() => (parserFactory.getParser("") as Parser<BoxStyle>).parse ({	
					border: {
						color: "gray",
						style: "solid",
						width: "1px"
					},
					backgroundColor: `gray${isDark ? "Dark" : "Light"}`
				}),
		[isDark]
	);

	const menuRef = useRef<HTMLDivElement | null> (null);
	
	const isFromTop = useMenuPosition ({menuElement: menuRef.current, anchorElement});

	return (
		<>{
			isOpen &&
				<Container
					ref = {menuRef}
					$open = {isOpen}
					$css = {css}
					$position = {isFromTop ? "top" : "bottom"}
					$fitContent = {fitContent}
				>
					{children}
				</Container>
		}</>
	);
}