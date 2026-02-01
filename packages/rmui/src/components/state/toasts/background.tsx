import { useMemo } from "react";
import { StaticStyle, ToasterProps } from "../../../types";
import SlideAnimation from "../../animated/slide";

interface ToastBackgroundProps
{
	visible: boolean;
	toasterPosition: Exclude<ToasterProps["position"], undefined>;
	style?: StaticStyle;
	children?: React.ReactNode;
	onAnimationEnd?: () => void;
}

export default function ToastBackground ({visible, toasterPosition, style, children, onAnimationEnd}: ToastBackgroundProps)
{
	const toasterHorizontalPosition = useMemo (
		() => toasterPosition.split("-")[1] as "left" | "right",
		[toasterPosition]
	);
	
	return (
		<SlideAnimation
			css = {style}
			from = {toasterHorizontalPosition}
			duration = "0.25s"
			visible = {visible}
			onAnimationEnd = {onAnimationEnd}
		>
			{children}
		</SlideAnimation>
	);
}