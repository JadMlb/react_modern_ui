import { keyframes } from "@emotion/react";
import { DynamicStyleFunction } from "../../../types";

export const slideRight = keyframes
`
	from
	{
		opacity: 0;
		transform: translateX(50dvw);
	}
	to
	{
		opacity: 1;
		transform: translateX(0);
	}
`;

export const slideLeft = keyframes
`
	from
	{
		opacity: 0;
		transform: translateX(-50dvw);
	}
	to
	{
		opacity: 1;
		transform: translateX(0);
	}
`;

export const slideBottom = keyframes
`
	from
	{
		opacity: 0;
		transform: translateY(50dvh);
	}
	to
	{
		opacity: 1;
		transform: translateY(0);
	}
`;

const DEFAULT_POPUP_STYLE: DynamicStyleFunction = isDark => ({
	display: "flex",
	flexDirection: "column",
	gap: "spacing.medium",
	borderRadius: "radius.medium",
	padding: "spacing.large",
	backgroundColor: isDark ? "black" : "white",
	color: isDark ? "white" : "black"
});

export default DEFAULT_POPUP_STYLE;