import styled from "@emotion/styled";
import { useDarkMode, useThemeParser } from "../../styles";
import { useMemo, useRef } from "react";
import useMenuPosition from "../../hooks/useMenuPosition";

const Container = styled.div<{$open?: boolean}>
`
	display: ${props => props.$open ? "block" : "none"};
	position: absolute;
	left: 0;
	
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

	const menuRef = useRef<HTMLDivElement | null> (null);
	const isFromTop = useMenuPosition ({menuElement: menuRef.current, anchorElement});

	const css = useMemo (
		() => parseTheme ({	
				border: "1px solid gray",
				backgroundColor: `gray${isDark ? "Dark" : "Light"}`,
				borderRadius: "radius.small",
				padding: "spacing.small",
				minWidth: !fitContent ? "calc(100% - 2 * spacing.small)" : "unset",
				top: !isFromTop ? "calc(100% + spacing.small)" : "unset",
				bottom: isFromTop ? "calc(100% + spacing.small)" : "unset"
			}),
		[isDark, parseTheme, fitContent, isFromTop]
	);

	return (
		<>{
			isOpen &&
				<Container
					ref = {menuRef}
					$open = {isOpen}
					css = {css}
				>
					{children}
				</Container>
		}</>
	);
}