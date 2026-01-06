export default interface PopupBaseProps
{
	open: boolean;
	onClose?: () => void;
	children: React.ReactNode;
}