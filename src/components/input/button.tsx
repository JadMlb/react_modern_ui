/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { Style, useDarkMode, useThemeParser } from "../../styles";
import { ButtonProps } from "../../types/components/Button/ButtonProps";
import { DEFAULT_BUTTON_STYLES } from "../../types/components/Button/ButtonStyle";

/**
 * Button component
 */
export default function Button ({role = "normal", type = "filled", htmlType, style, ...rest}: ButtonProps)
{
	const isDark = useDarkMode();

	const parseTheme = useThemeParser();
	const [css, setCss] = useState<Style> ({});

	useEffect (
		() =>
		{
			const DEFAULT_TYPE_STYLE = DEFAULT_BUTTON_STYLES[type]!;
			if (DEFAULT_TYPE_STYLE)
				setCss (parseTheme ({...DEFAULT_TYPE_STYLE (role, isDark ? "dark" : "light"), ...style}));
		},
		[style, role, type, isDark, parseTheme]
	);

	return (
		<button
			type = {htmlType}
			css = {css}
			{...rest}
		/>
	);
}