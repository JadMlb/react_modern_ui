import { keyframes } from "@emotion/react";
import { Style } from "../../../types";

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

const DEFAULT_POPUP_STYLE: Style = isDark => ({
	display: "flex",
	flexDirection: "column",
	gap: "spacing.medium",
	borderRadius: "radius.medium",
	padding: "spacing.large",
	backgroundColor: isDark ? "black" : "white"
});

export default DEFAULT_POPUP_STYLE;