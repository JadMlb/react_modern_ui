import { useMemo } from "react";
/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Option } from "../../../../types";
import { radius, spacing, useDarkMode, useThemeParser } from "../../../../styles";

const Container = styled.div
`
	cursor: pointer;
	padding-inline: ${spacing.xsmall};
	border-radius: calc(${radius.small} - ${spacing.xsmall});
`;

interface ComboboxOptionProps
{
	option: Option;
	selected?: boolean;
	onClick: (option: Option) => void;
}

export default function ComboboxOption ({option, selected, onClick}: ComboboxOptionProps)
{
	const isDark = useDarkMode();
	
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
					backgroundColor: selected ? "primary" : "transparent",
					color: selected || isDark ? "white" : "black",
					":hover": {
						backgroundColor: `primary${isDark ? "Dark" : "Elevated"}`,
						color: isDark ? "white" : "black"
					}
				}),
		[parseCss, isDark, selected]
	);
	
	return (
		<Container onClick = {() => onClick (option)} css = {css}>
			{option.display}
		</Container>
	);
}