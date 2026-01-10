import { Props } from "../Props";
import DialogConfigProps from "./DialogProps";
import GenericPopupStylingProps from "./PopupStylingProps";

export default interface DrawerConfigProps extends DialogConfigProps
{
	position?: "right" | "left" | "bottom";
	hideCloseButton?: boolean;
}

export type DrawerStylingProps = GenericPopupStylingProps<DrawerConfigProps>;
export type DrawerProps = Props<DrawerConfigProps, DrawerStylingProps>;

export type OverridableDrawerProps = Pick<DrawerProps, "position">;