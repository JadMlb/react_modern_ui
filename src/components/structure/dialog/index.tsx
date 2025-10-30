import DialogProps from "../../../types/components/Popups/DialogProps";
import Popup from "../popup_backdrop/popup";

export default function Dialog (props: DialogProps)
{
	return (
		<Popup position = "center" {...props}/>
	);
}