/** @jsxImportSource @emotion/react */
import PopupProps from "../../../types/components/Popups/PopupProps";
import { StaticStyle } from "../../../types";
import Horizontal from "./horizontal";

interface PopupWithChildrenProps extends PopupProps
{
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: StaticStyle;
	headerStyle?: StaticStyle;
	footerStyle?: StaticStyle;
}

export default function PopupContainer ({id, className, style, header, headerStyle, footer, footerStyle, children}: PopupWithChildrenProps)
{
	return (
		<div id = {id} className = {className} css = {style}>
			<Horizontal style = {headerStyle}>
				{header}
			</Horizontal>
			{children}
			<Horizontal style = {footerStyle}>
				{footer}
			</Horizontal>
		</div>
	);
}