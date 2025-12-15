import { Style } from "../../styles";

export default interface PopupProps
{
	header?: React.ReactNode;
	headerStyle?: Style;
	footer?: React.ReactNode;
	footerStyle?: Style;
}