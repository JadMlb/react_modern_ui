import StylingProps from "../../styles/StylingProps";
import PopupBaseProps from "./PopupBaseProps";

export default interface PopupBackdropProps extends PopupBaseProps, StylingProps
{
	position?: "center" | "left" | "right" | "bottom";
	forComponent: "dialog" | "drawer.default" | "drawer.withHeader"
}