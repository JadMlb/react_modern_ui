import { useMemo } from "react";
import ToasterProps from "../../../types/components/Toaster/ToasterProps";
import { keyframes } from "@emotion/react";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

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


interface ToasterContainerProps
{
	id?: string;
	className?: string;
	children?: React.ReactNode;
	position: Exclude<ToasterProps["position"], undefined>;
	style?: Style;
}

export default function ToasterContainer ({id, className, position, style, children}: ToasterContainerProps)
{
	const injectedStyle = useMemo (
		() => ({
			flexDirection: `column${position.startsWith ("bottom") ? "-reverse" : ""}`,
			[position.split("-")[0]]: 0,
			[position.split("-")[1]]: 0,
			"> *": {
				animation: `${position.split("-")[1] === "left" ? toastFromLeft : toastFromRight} 250ms`,
			},
		} satisfies Style),
		[position]
	);

	const css = useStyle ("toaster", style, injectedStyle, "containerStyle");

	return (
		<div id = {id} className = {className} css = {css}>
			{children}
		</div>
	);
}