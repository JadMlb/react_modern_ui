import StylingProps from "../../styles/StylingProps";

export default interface PopupBaseProps extends StylingProps
{
	open: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}