/** @jsxImportSource @emotion/react */
import PopupProps from "../../../types/components/Popups/PopupProps";
import { StaticStyle } from "../../../types";
import Horizontal from "./horizontal";
import BaseProps from "../../../types/components/BaseProps";
import SlideAnimation from "../../animated/slide";
import { useMemo } from "react";

interface PopupWithChildrenProps extends PopupProps, BaseProps
{
	open: boolean;
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: StaticStyle;
	headerStyle?: StaticStyle;
	footerStyle?: StaticStyle;
	position?: "center" | "left" | "right" | "bottom";
	onAnimationEnd?: () => void;
}

export default function PopupContainer ({open, as, style, header, headerStyle, footer, footerStyle, children, position, onAnimationEnd, ...rest}: PopupWithChildrenProps)
{
	const from = useMemo (
		() => position === "center" ? "bottom" : position,
		[position]
	);

	return (
		<SlideAnimation
			as = {as ?? "dialog"}
			from = {from}
			css = {style}
			{...rest}
			visible = {open}
			duration = "0.25s"
			onAnimationEnd = {onAnimationEnd}
		>
			<Horizontal style = {headerStyle}>
				{header}
			</Horizontal>
			{children}
			<Horizontal style = {footerStyle}>
				{footer}
			</Horizontal>
		</SlideAnimation>
	);
}