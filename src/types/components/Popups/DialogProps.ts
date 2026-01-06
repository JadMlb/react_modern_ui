import PopupBaseProps from "./PopupBaseProps";
import PopupProps from "./PopupProps";
import PopupStylingProps from "./PopupStylingProps";

export default interface DialogProps extends PopupBaseProps, PopupProps, PopupStylingProps
{}

export type OverridableDialogProps = never;