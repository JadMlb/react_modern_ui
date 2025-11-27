import { useMemo } from "react";
import { Style, useThemeParser } from "../../../styles";
import ToasterProps from "../../../types/components/Toaster/ToasterProps";
import { keyframes } from "@emotion/react";

const toastFromRight = keyframes
`
	from
	{
		transform: translateX(100%);
	}
	to
	{
		transform: translateX(0);
	}
`;

const toastFromLeft = keyframes
`
	from
	{
		transform: translateX(-100%);
	}
	to
	{
		transform: translateX(0);
	}
`;

const ANIMATION_SPEED = "250ms";

const DEFAULT_STYLE = {
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
		transition: `transform ${ANIMATION_SPEED}, opacity ${ANIMATION_SPEED}, box-shadow ${ANIMATION_SPEED} ease-in-out`
	}
} satisfies Style;

interface ToasterContainerProps
{
	children?: React.ReactNode;
	position: Exclude<ToasterProps["position"], undefined>;
	style?: Style;
}

export default function ToasterContainer ({position, style, children}: ToasterContainerProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			flexDirection: `column${position.startsWith ("bottom") ? "-reverse" : ""}`,
			[position.split("-")[0]]: 0,
			[position.split("-")[1]]: 0,
			"> *": {
				animation: `${position.split("-")[1] === "left" ? toastFromLeft : toastFromRight} ${ANIMATION_SPEED}`,
				...DEFAULT_STYLE["> *"]
			},
			...style
		}),
		[style, parseCss, position]
	);

	return (
		<div css = {css}>
			{children}
		</div>
	);
}