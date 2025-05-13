import styled from "@emotion/styled";
import { Option } from "../../../../types";
import { radius, spacing, useDarkMode, useThemeColours } from "../../../../styles";
import { ParserFactory } from "../../../../types/components/styles/generic/ParserFactory";
import { useMemo } from "react";
import { Parser } from "../../../../types/components/styles/generic/Parser";
import { ActionElementStyle } from "../../../../types/components/styles/actionElement/ActionElementStyle";

const Container = styled.div<{$css: string}>
`
	cursor: pointer;
	padding-inline: ${spacing.xsmall};
	border-radius: calc(${radius.small} - ${spacing.xsmall});
	${props => props.$css}
`;

interface ComboboxOptionProps
{
	option: Option;
	selected?: boolean;
	onClick: (option: Option) => void;
}

export default function ComboboxOption ({option, selected, onClick}: ComboboxOptionProps)
{
	const colour = useThemeColours();
	const isDark = useDarkMode();
	
	const parserFactory = new ParserFactory (colour);
	const css = useMemo (
		() =>
			(parserFactory.getParser("") as Parser<ActionElementStyle>)
				.parse ({
					backgroundColor: selected ? "primary" : "transparent",
					color: selected || isDark ? "white" : "black",
					hover: {
						backgroundColor: `primary${isDark ? "Dark" : "Elevated"}`,
						color: isDark ? "white" : "black"
					}
				}),
		[isDark, selected]
	);
	
	return (
		<Container onClick = {() => onClick (option)} $css = {css}>
			{option.display}
		</Container>
	);
}