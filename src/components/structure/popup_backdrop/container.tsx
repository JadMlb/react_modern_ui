/** @jsxImportSource @emotion/react */
import PopupProps from "../../../types/components/Popups/PopupProps";
import { StaticStyle } from "../../../types";
import Horizontal from "./horizontal";
import BaseProps from "../../../types/components/BaseProps";

interface PopupWithChildrenProps extends PopupProps, BaseProps
{
	children: React.ReactNode;
	id?: string;
	className?: string;
	style?: StaticStyle;
	headerStyle?: StaticStyle;
	footerStyle?: StaticStyle;
}

export default function PopupContainer ({as, style, header, headerStyle, footer, footerStyle, children, ...rest}: PopupWithChildrenProps)
{
	const Component = as ?? "dialog";

	return (
		<Component css = {style} {...rest}>
			<Horizontal style = {headerStyle}>
				{header}
			</Horizontal>
			{children}
			<Horizontal style = {footerStyle}>
				{footer}
			</Horizontal>
		</Component>
	);
}