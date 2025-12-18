import { keyframes } from "@emotion/react";
import { Overridable, OverridableBlockSkeletonLoaderProps, OverridableTextSkeletonLoaderProps } from "../../../types";
import WrappedElementStylingProps from "../../../types/styles/WrappedElementStylingProps";

const ShineAnimation = keyframes
`
	from
	{
		right: 100%;
	}

	to
	{
		right: 0;
	}
`;

const STYLES: WrappedElementStylingProps = {
	parentStyle: isDark => ({
		position: "relative",
		display: "flex",
		flexDirection: "column",
		gap: "spacing.medium",
		"&:before": {
			content: '""',
			display: "block",
			position: "absolute",
			backgroundColor: `color(from ${isDark ? "black" : "white"} srgb r g b / 0.3)`,
			right: "-100%",
			width: "10%",
			height: "100%",
			clipPath: "polygon(25% 0, 100% 0, 75% 100%, 0 100%)",
			animation: `${ShineAnimation} 3s ease-in-out infinite`
		}
	}),
	style: isDark => ({
		borderRadius: "radius.small",
		backgroundColor: `gray${isDark ? "Dark" : "Light"}`
	})
};

export const DEFAULT_TEXT_LOADER_PROPS: Overridable<OverridableTextSkeletonLoaderProps, WrappedElementStylingProps> = {
	props: {
		lines: 5
	},
	styles: STYLES
};

export const DEFAULT_BLOCK_LOADER_PROPS: Overridable<OverridableBlockSkeletonLoaderProps, WrappedElementStylingProps> = {
	styles: STYLES
};