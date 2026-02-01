import { useMemo } from "react";
import { StaticStyle } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";
import ZoomAnimation from "../../animated/zoom";
import { SlideAnimation } from "../../animated";

interface PopupAnimationProps extends BaseProps
{
	open: boolean;
	children: React.ReactNode;
	id?: string;
	className?: string;
	position: "center" | "left" | "right" | "bottom";
	style?: StaticStyle;
	onAnimationEnd?: () => void;
}

export default function PopupAnimation ({open, as, style, children, position, onAnimationEnd, ...rest}: PopupAnimationProps)
{
	const from = useMemo (
		() => position === "center" ? "bottom" : position,
		[position]
	);
	
	if (position === "center")
		return (
			<ZoomAnimation 
				as = {as ?? "dialog"}
				css = {style}
				{...rest}
				visible = {open}
				duration = "0.25s"
				onAnimationEnd = {onAnimationEnd}
			>
				{children}
			</ZoomAnimation>
		);

	return (
		<SlideAnimation 
			as = {as ?? "dialog"}
			css = {style}
			from = {from}
			{...rest}
			visible = {open}
			duration = "0.25s"
			onAnimationEnd = {onAnimationEnd}
		>
			{children}
		</SlideAnimation>
	);
}