/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { Style, useDarkMode, useThemeParser } from "../../../styles";
import PopupProps from "../../../types/components/Popups/PopupProps";
import { GenericProps } from "../../../types";
import { keyframes } from "@emotion/react";

interface PopupWithChildrenProps extends PopupProps, GenericProps
{
	children: React.ReactNode;
	maxHeight?: boolean;
	position?: "left" | "right" | "center";
}

function Horizontal ({style, children}: {children: React.ReactNode, style?: Style})
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			display: "flex",
			flexDirection: "row",
			gap: "spacing.medium",
			alignItems: "center",
			...style
		}),
		[style]
	);

	return (
		<div css = {css}>
			{children}
		</div>
	);
}

const DEFAULT_STYLE = {
	display: "flex",
	flexDirection: "column",
	gap: "spacing.medium",
	borderRadius: "radius.medium",
	padding: "spacing.large"
} satisfies Style;

const slideRight = keyframes
`
	from
	{
		opacity: 0;
		transform: translateX(50dvw);
	}
	to
	{
		opacity: 1;
		transform: translateX(0);
	}
`;

const slideLeft = keyframes
`
	from
	{
		opacity: 0;
		transform: translateX(-50dvw);
	}
	to
	{
		opacity: 1;
		transform: translateX(0);
	}
`;

const slideBottom = keyframes
`
	from
	{
		opacity: 0;
		transform: translateY(50dvh);
	}
	to
	{
		opacity: 1;
		transform: translateY(0);
	}
`;

function getTopBottomPadding (base: Style, style?: Style)
{
	const paddingTop = style?.paddingTop ?? style?.paddingBlock ?? style?.paddingBlockStart ?? style?.padding ??
						base.paddingTop ?? base.paddingBlock ?? base.paddingBlockStart ?? base.padding;
	const paddingBottom = style?.paddingBottom ?? style?.paddingBlock ?? style?.paddingBlockEnd ?? style?.padding ??
						base.paddingBottom ?? base.paddingBlock ?? base.paddingBlockEnd ?? base.padding;
	const paddingTopType = typeof paddingTop;
	const paddingBottomType = typeof paddingBottom;

	const ALLOWED_TYPES = ["number" ,"string"];
	if (!ALLOWED_TYPES.includes (paddingTopType) || !ALLOWED_TYPES.includes (paddingBottomType))
		return "spacing.large";
	const paddingTopString = paddingTopType === "number" ? `${paddingTop}px` : paddingTop;
	const paddingBottomString = paddingBottomType === "number" ? `${paddingBottom}px` : paddingBottom;

	return `${paddingTopString} + ${paddingBottomString}`;
}

export default function PopupContainer ({id, className, style, header, headerStyle, footer, footerStyle, maxHeight, position, children}: PopupWithChildrenProps)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();

	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			backgroundColor: isDark ? "black" : "white",
			maxHeight: maxHeight ? "100dvh" : "50dvh",
			height: maxHeight ? `calc(100dvh - (${getTopBottomPadding (DEFAULT_STYLE, style)}))` : "fit-content",
			width: "50dvw",
			animation: `${position === "right" ? slideRight : position === "left" ? slideLeft : slideBottom} 0.25s ease-in-out`,
			...style
		}),
		[style, maxHeight, isDark]
	);

	return (
		<div id = {id} className = {className} css = {css}>
			{header && <Horizontal style = {headerStyle}>{header}</Horizontal>}
			{children}
			{footer && <Horizontal style = {footerStyle}>{footer}</Horizontal>}
		</div>
	);
}