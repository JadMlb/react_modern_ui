import { Style } from "../../styles";
import PopupBaseProps from "./PopupBaseProps";
import PopupProps from "./PopupProps";

export default interface DialogProps extends PopupBaseProps, PopupProps
{
	backdropStyle?: Style;
}

export type OverridableDialogProps = never;