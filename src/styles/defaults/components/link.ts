import { Overridable, OverridableLinkProps } from "../../../types";
import StylingProps from "../../../types/styles/StylingProps";

const DEFAULT_LINK_PROPS: Overridable<OverridableLinkProps, StylingProps> = {
	styles: {
		style: isDark => ({
			font: "inherit",
			cursor: "pointer",
			textDecoration: "none",
			color: isDark ? "white" : "black",
			position: "relative",
			zIndex: 0,
			"::after": {
				content: '""',
				position: "absolute",
				bottom: 0,
				left: 0,
				width: "100%",
				zIndex: -1,
				height: 2,
				transition: "height 0.2s ease-in-out",
			},
			":hover::after": {
				height: "50%"
			}
		})
	}
};

export default DEFAULT_LINK_PROPS;