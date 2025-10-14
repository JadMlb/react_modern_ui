import styled from "@emotion/styled";
import { radius, spacing, useDarkMode, useThemeParser } from "../../styles";
import { useMemo, useRef } from "react";
import useMenuPosition from "../../hooks/useMenuPosition";

const Container = styled.div<{$fitContent?: boolean, $open?: boolean, $position?: "top" | "bottom"}>
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

export default function Menu ({anchorElement, isOpen, children, fitContent}: MenuProps)
{
	const isDark = useDarkMode();
	const parseTheme = useThemeParser();

	const css = useMemo (
		() => parseTheme ({	
				border: "1px solid gray",
				backgroundColor: `gray${isDark ? "Dark" : "Light"}`
			}),
		[isDark, parseTheme]
	);

	const menuRef = useRef<HTMLDivElement | null> (null);
	
	const isFromTop = useMenuPosition ({menuElement: menuRef.current, anchorElement});

	return (
		<>{
			isOpen &&
				<Container
					ref = {menuRef}
					$open = {isOpen}
					css = {css}
					$position = {isFromTop ? "top" : "bottom"}
					$fitContent = {fitContent}
				>
					{children}
				</Container>
		}</>
	);
}