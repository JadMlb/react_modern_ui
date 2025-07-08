/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { spacing } from "../../styles/styles";
import { Style, useThemeParser } from "../../styles/theme";
import SeparatorProps from "../../types/components/Separator/SeparatorProps";
import { useEffect, useState } from "react";

const Wrapper = styled.div
`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: ${spacing.small};
`;

const DEFAULT_STYLE = {
	height: 1,
	width: "100%",
	backgroundColor: "primary",
} satisfies Style;

const DEFAULT_PARENT_STYLE = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: spacing.small,
	"> small": {
		color: "primary",
		flexGrow: 1,
		flexShrink: 0.5
	}
} satisfies Style;

/**
 * Draws a horizontal separator with or without a title to distinguish parts
 */
export default function Separator ({id, className, style, parentStyle, title}: SeparatorProps)
{
	const parseCss = useThemeParser();
	const [css, setCss] = useState<Style> ({});
	const [parentCss, setParentCss] = useState<Style> ({});

	useEffect (
		() => setCss (parseCss ({...DEFAULT_STYLE, ...style})),
		[style, parseCss]
	);
	
	useEffect (
		() => setParentCss (parseCss ({...DEFAULT_PARENT_STYLE, ...parentStyle})),
		[parentStyle, parseCss]
	);

	return (
		<Wrapper id = {id} className = {className} css = {parentCss}>
			<small>{title}</small>
			<div css = {css}/>
		</Wrapper>
	);
}