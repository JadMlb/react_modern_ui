/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Style, spacing, useThemeParser } from "../../../styles";
import { useEffect, useState } from "react";

const Lbl = styled.label
`
	font-size: 0.8rem;
	font-weight: bold;
	margin-left: calc(2 * ${spacing.xsmall});
`;

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
			if (style)
				setCss (parseStyle (style));
		},
		[style, setCss]
	);

	return (
		<>{
			!hidden && children &&
			<Lbl
				htmlFor = {htmlFor}
				css = {css}
			>
				{children}
			</Lbl>
		}</>
	);
}