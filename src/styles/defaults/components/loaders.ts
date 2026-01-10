import { keyframes } from "@emotion/react";
import { BlockSkeletonLoaderStyleProps, DynamicStyleFunction, Overridable, OverridableBlockSkeletonLoaderProps, OverridableTextSkeletonLoaderProps, TextSkeletonLoaderStyleProps } from "../../../types";

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

const PARENT_STYLE: DynamicStyleFunction = isDark => ({
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
});

const STYLE: DynamicStyleFunction = isDark => ({
	borderRadius: "radius.small",
	backgroundColor: `gray${isDark ? "Dark" : "Light"}`
});

export const DEFAULT_TEXT_LOADER_PROPS: Overridable<OverridableTextSkeletonLoaderProps, TextSkeletonLoaderStyleProps> = {
	props: {
		lines: 5
	},
	styles: {
		parentStyle: PARENT_STYLE,
		style: (isDark, props) => ({
			...STYLE (isDark, props),
			width: Math.random(),
			height: 20
		})
	}
};

export const DEFAULT_BLOCK_LOADER_PROPS: Overridable<OverridableBlockSkeletonLoaderProps, BlockSkeletonLoaderStyleProps> = {
	styles: {
		parentStyle: PARENT_STYLE,
		style: (isDark, props) => ({
			...STYLE (isDark, props),
			width: 100,
			height: 100
		})
	}
};