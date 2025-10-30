import { useMemo } from "react";
import DrawerWithDefaultHeaderProps from "../../../types/components/Popups/DrawerWithDefaultHeaderProps";
import Popup from "../popup_backdrop/popup";
import DrawerHeader from "./header";

export default function DrawerWithHeader (props: DrawerWithDefaultHeaderProps)
{
	const {position, header, title, noCloseButton, headerStyle, ...popupProps} = props;

	const realHeaderStyle = useMemo (
		() => ({
			justifyContent: "space-between",
			width: "100%",
			...headerStyle
		}),
		[headerStyle]
	);
	
	return (
		<Popup
			position = {position ?? "right"}
			header = {
				<DrawerHeader title = {title} noCloseButton = {noCloseButton} onClose = {popupProps.onClose}>
					{header}
				</DrawerHeader>
			}
			headerStyle = {realHeaderStyle}
			maxHeight
			{...popupProps}
		/>
	);
}