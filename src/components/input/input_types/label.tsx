/** @jsxImportSource @emotion/react */
import { Style, useThemeParser } from "../../../styles";
import { useEffect, useState } from "react";

const DEFAULT_STYLE = {
	fontSize: "0.8rem",
	fontWeight: "bold",
	marginLeft: "calc(2 * spacing.xsmall)"
} satisfies Style;

interface InputLabelProps
{
	children?: string;
	htmlFor?: string;
	style?: Style;
	hidden?: boolean;
}

export default function InputLabel ({children, hidden, htmlFor, style}: InputLabelProps)
{
	const parseStyle = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			setCss (
					parseStyle ({
						...DEFAULT_STYLE,
						...style
					})
			);
		},
		[style, setCss]
	);

	return (
		<>{
			!hidden && children &&
			<label
				htmlFor = {htmlFor}
				css = {css}
			>
				{children}
			</label>
		}</>
	);
}