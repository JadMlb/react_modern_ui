import { Overridable, OverridableToasterProps } from "../../../types";
import ToasterStylingProps from "../../../types/components/Toaster/ToasterStylingProps";

const DEFAULT_TOASTER_PROPS: Overridable<OverridableToasterProps, ToasterStylingProps> = {
	props: {
		position: "bottom-right",
		clearAfter: 5,
		icons: {
			"info": {icon: "?", colour: "primary"},
			"success": {icon: "\u2713", colour: "affirmative"},
			"warn": {icon: "!", colour: "alert"},
			"fail": {icon: "\u2715", colour: "error"}
		}
	},
	styles: {
		containerStyle: {
			position: "fixed",
			zIndex: 100000,
			padding: "spacing.small",
			width: "100%",
			maxWidth: 400,
			maxHeight: "100dvh",
			overflow: "hidden auto",
			display: "flex",
			gap: "spacing.medium",
			"> *": {
				transition: `transform 250ms, opacity 250ms, box-shadow 250ms ease-in-out`
			}
		},
		toastStyle: isDark => ({
			padding: "spacing.xsmall",
			borderRadius: "radius.small",
			boxShadow: "gray 0px 1px 3px 0px",
			opacity: 0.99,
			position: "relative",
			overflow: "hidden",
			display: "grid",
			gridTemplateColumns: "30px 1fr 30px",
			gap: "spacing.small",
			alignItems: "center",
			backgroundColor: isDark ? "black" : "white"
		}),
		clearButtonStyle: {
			width: "30px",
			height: "30px",
			borderRadius: "radius.round"
		},
		iconContainerStyle: {
			width: 30,
			height: 30,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			borderRadius: "radius.round",
			color: "white",
			fontWeight: "bold"
		}
	}
};

export default DEFAULT_TOASTER_PROPS;