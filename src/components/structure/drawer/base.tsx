import DrawerProps from "../../../types/components/Popups/DrawerProps";
import Popup from "../popup_backdrop/popup";

export default function DrawerNoHeader (props: DrawerProps)
{
	const {position, ...popupProps} = props;

	return (
		<Popup
			position = {position ?? "right"}
			maxHeight
			{...popupProps}
		/>
	);
}