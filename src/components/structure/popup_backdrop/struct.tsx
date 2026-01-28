import { StaticStyle } from "../../../types"
import Horizontal from "./horizontal"

interface PopupStructureProps
{
	headerStyle?: StaticStyle;
	header?: React.ReactNode;
	children?: React.ReactNode;
	footerStyle?: StaticStyle;
	footer?: React.ReactNode;
}

export default function PopupStructure ({header, headerStyle, footer, footerStyle, children}: PopupStructureProps)
{
	return (
		<>
			<Horizontal style = {headerStyle}>
				{header}
			</Horizontal>
			{children}
			<Horizontal style = {footerStyle}>
				{footer}
			</Horizontal>
		</>
	);
}