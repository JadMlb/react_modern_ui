import BaseProps from "../BaseProps";
import { Props } from "../Props";
import PopupBaseProps from "./PopupBaseProps";
import PopupProps from "./PopupProps";
import GenericPopupStylingProps from "./PopupStylingProps";

export default interface DialogConfigProps extends PopupBaseProps, PopupProps, BaseProps
{}

export type DialogStylingProps = GenericPopupStylingProps<DialogConfigProps>;
export type DialogProps = Props<DialogConfigProps, DialogStylingProps>;

export type OverridableDialogProps = never;