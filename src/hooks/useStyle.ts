import { useMemo } from "react";
import { useDarkMode, useTheme, useThemeParser } from "../styles";
import { at, merge } from "lodash";
import { Components, ComponentsOverridesTypeForComponent, StaticStyle, Style } from "../types";

function useStaticStyle (isDark: boolean, style?: Style): StaticStyle
{
	const staticStyle = useMemo (
		() =>
		{
			if (!style)
				return {};

			if (typeof style === "object")
				return style;

			return style (isDark);
		},
		[isDark, style]
	);

	return staticStyle;
}

function useComponentDefaultStyles<Component extends Components> (component: Component, isDark: boolean, prop: string = "style")
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;
	if (!defaultsForComponent)
		return {};
	const staticStyle = useStaticStyle (isDark, defaultsForComponent.styles?.[prop as keyof typeof defaultsForComponent.styles]);
	return staticStyle;
}

export default function useStyle (component: Components, modifications?: Style, internalDefaultStyles?: Style, prop?: string) : StaticStyle
{
	const parseCss = useThemeParser();
	const isDark = useDarkMode();

	const defaultStyles = useComponentDefaultStyles (component, isDark, prop);
	const staticBaseStyle = useStaticStyle (isDark, defaultStyles);
	const staticModificationsStyle = useStaticStyle (isDark, modifications);
	const staticInternalStyle = useStaticStyle (isDark, internalDefaultStyles);

	const css = useMemo (
		() => parseCss (
			merge (
				staticBaseStyle,
				staticInternalStyle,
				staticModificationsStyle
			)
		),
		[parseCss, staticBaseStyle, staticModificationsStyle]
	);
	
	return css;
}