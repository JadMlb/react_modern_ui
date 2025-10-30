import { GenericProps } from "../GenericProps";

export default interface PopupBaseProps extends GenericProps
{
	open: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}