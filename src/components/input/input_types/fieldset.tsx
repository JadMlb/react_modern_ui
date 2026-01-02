import { useMemo } from "react";
import { useThemeParser } from "../../../styles";
import { Style } from "../../../types";

const DEFAULT_STYLE = {
	display: "flex",
	flexDirection: "column",
	padding: "unset",
	margin: "unset",
	border: "unset"
} satisfies Style;

interface FieldsetProps
{
	disabled?: boolean;
	style?: Style;
	children?: React.ReactNode;
}

export default function Fieldset ({disabled, style, children}: FieldsetProps)
{
	const parseCss = useThemeParser();
	const css = useMemo (
		() => parseCss ({
			...DEFAULT_STYLE,
			...style
		}),
		[style, parseCss]
	);

	return (
		<fieldset css = {css} aria-disabled = {disabled}>
			{children}
		</fieldset>
	);
}