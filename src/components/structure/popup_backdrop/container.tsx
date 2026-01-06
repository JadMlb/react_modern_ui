/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import PopupProps from "../../../types/components/Popups/PopupProps";
import { StaticStyle } from "../../../types";
import { keyframes } from "@emotion/react";
import PopupStylingProps from "../../../types/components/Popups/PopupStylingProps";
import useStyle from "../../../hooks/useStyle";
import Horizontal from "./horizontal";

interface PopupWithChildrenProps extends PopupProps, PopupStylingProps
{
	children: React.ReactNode;
	maxHeight?: boolean;
	position?: "left" | "right" | "center" | "bottom";
	forComponent: "dialog" | "drawer.default" | "drawer.withHeader";
}

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

function getTopBottomPadding (style: StaticStyle)
{
	const paddingTop = style.paddingTop ?? style.paddingBlock ?? style.paddingBlockStart ?? style.padding;
	const paddingBottom = style.paddingBottom ?? style.paddingBlock ?? style.paddingBlockEnd ?? style.padding;
	const paddingTopType = typeof paddingTop;
	const paddingBottomType = typeof paddingBottom;

	const ALLOWED_TYPES = ["number" ,"string"];
	if (!ALLOWED_TYPES.includes (paddingTopType) || !ALLOWED_TYPES.includes (paddingBottomType))
		return "spacing.large";
	const paddingTopString = paddingTopType === "number" ? `${paddingTop}px` : paddingTop;
	const paddingBottomString = paddingBottomType === "number" ? `${paddingBottom}px` : paddingBottom;

	return `${paddingTopString} + ${paddingBottomString}`;
}

export default function PopupContainer ({forComponent, id, className, style, header, headerStyle, footer, footerStyle, maxHeight, position, children}: PopupWithChildrenProps)
{
	const injectedStyles = useMemo (
		() => ({
			maxHeight: maxHeight ? "100dvh" : "50dvh",
			width: position === "bottom" ? "100dvw" : "50dvw",
			animation: `${position === "right" ? slideRight : position === "left" ? slideLeft : slideBottom} 0.25s ease-in-out`,
		}),
		[maxHeight, position]
	);

	const noHeightCss = useStyle (forComponent, style, injectedStyles);
	const css = useMemo (
		() => ({
			...noHeightCss,
			height: maxHeight ? `calc(100dvh - (${getTopBottomPadding (noHeightCss)}))` : "fit-content",
		}),
		[noHeightCss, maxHeight]
	);

	return (
		<div id = {id} className = {className} css = {css}>
			<Horizontal
				forComponent = {forComponent}
				position = "header"
				style = {headerStyle}
			>
				{header}
			</Horizontal>
			{children}
			<Horizontal
				forComponent = {forComponent}
				position = "footer"
				style = {footerStyle}
			>
				{footer}
			</Horizontal>
		</div>
	);
}