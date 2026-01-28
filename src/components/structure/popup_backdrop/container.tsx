/** @jsxImportSource @emotion/react */
import PopupProps from "../../../types/components/Popups/PopupProps";
import { StaticStyle } from "../../../types";
import BaseProps from "../../../types/components/BaseProps";
import PopupAnimation from "./animation";
import PopupStructure from "./struct";

interface PopupWithChildrenProps extends PopupProps, BaseProps
{
	open: boolean;
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: StaticStyle;
	headerStyle?: StaticStyle;
	footerStyle?: StaticStyle;
	position: "center" | "left" | "right" | "bottom";
	onAnimationEnd?: () => void;
}

export default function PopupContainer ({header, headerStyle, footer, footerStyle, children, ...rest}: PopupWithChildrenProps)
{
	return (
		<PopupAnimation {...rest}>
			<PopupStructure
				header = {header}
				headerStyle = {headerStyle}
				footer = {footer}
				footerStyle = {footerStyle}
			>
				{children}
			</PopupStructure>
		</PopupAnimation>
	);
}