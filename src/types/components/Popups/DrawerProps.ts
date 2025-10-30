import DialogProps from "./DialogProps";

export default interface DrawerProps extends DialogProps
{
	position?: "right" | "left";
	withHeader?: boolean;
}