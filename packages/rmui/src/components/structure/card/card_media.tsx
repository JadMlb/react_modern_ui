import React from "react";

const MEDIA_STYLE = {
	gridArea: "media",
	alignSelf: "center",
	justifySelf: "center"
} as const;

interface CardMediaProps
{
	children?: React.ReactNode;
}

export default function CardMedia ({children}: CardMediaProps)
{
	if (!children)
		return null;
	
	return (
		<span css = {MEDIA_STYLE}>{children}</span>
	);
}