import { useCallback, useMemo } from "react";
import { useDarkMode, useTheme, useThemeParser } from "../styles";
import { at, merge } from "lodash";
import { Components, ComponentsOverridesTypeForComponent, Style } from "../types";

// function useStaticStyle (isDark: boolean, style?: Style): StaticStyle
// {
// 	const staticStyle = useMemo (
// 		() =>
// 		{
// 			if (!style)
// 				return {};

// 			if (typeof style === "object")
// 				return style;

// 			return style (isDark, undefined);
// 		},
// 		[isDark, style]
// 	);

// 	return staticStyle;
// }

function useStaticStyleWrapper<T> (style?: Style<T>)
{
	return useCallback (
		(isDark: boolean, props: T) =>
		{
			if (!style)
				return {};

			if (typeof style === "object")
				return style;

			return style (isDark, props);
		},
		[style]
	);
}

// function useComponentDefaultStyles<Component extends Components> (component: Component, isDark: boolean, prop: "style" | `${string}Style` = "style")
// {
// 	const {theme: {defaults}} = useTheme();
// 	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;
// 	if (!defaultsForComponent || !defaultsForComponent.styles)
// 		return (isDark: boolean, props: unknown) => ({});
// 	type StyleIndex = keyof typeof defaultsForComponent.styles;
// 	const staticStyle = useStaticStyleWrapper (defaultsForComponent.styles[prop as StyleIndex] as any);
// 	return staticStyle;
// }

type StyleType = {
	[key in "style" | `${string}Style`]: any
};

function isValidStylesDefinition (styles: any): styles is StyleType
{
	return styles !== undefined
			&& styles !== null
			&& (
				typeof styles === "function"
				|| typeof styles === "object"
				&& Object.keys (styles)
						.every (key => key === "id" || key === "className" || key.toLowerCase().endsWith ("style"))
			);
}

function useComponentDefaultStyles<Component extends Components, T> (component: Component, prop: "style" | `${string}Style` = "style")
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;
	if (!defaultsForComponent || !defaultsForComponent.styles)
		return useStaticStyleWrapper<T> (undefined);
	const style = defaultsForComponent.styles;
	if (!isValidStylesDefinition (style))
		return useStaticStyleWrapper<T> (undefined);
	const staticStyle = useStaticStyleWrapper<T> (style[prop]);
	return staticStyle;
}

// useStyle for component using these modifications on this prop, and inject the component's props
export default function useStyle<InstancePropsType> (component: Components, instanceProps: InstancePropsType, modifications?: Style<InstancePropsType>, prop?: "style" | `${string}Style`)
{
	const isDark = useDarkMode();
	const parseCss = useThemeParser();
	// get default styles for component (props can be injected)
	const defaultStylesFunction = useComponentDefaultStyles<Components, InstancePropsType> (component, prop);
	// inject isDark & props into default props style function to get static style
	const defaultStaticStyle = useMemo (
		() => defaultStylesFunction (isDark, instanceProps),
		[defaultStylesFunction, isDark, instanceProps]
	);
	// inject isDark & props into modifications to get static style
	const modificationsStyleFunction = useStaticStyleWrapper (modifications);
	const staticModificationsStyle = useMemo (
		() => modificationsStyleFunction (isDark, instanceProps),
		[modificationsStyleFunction, isDark, instanceProps]
	);
	// combine static styles
	// parse
	// return
	return useMemo (
		() => parseCss (
			merge (
				{},
				defaultStaticStyle,
				staticModificationsStyle
			)
		),
		[defaultStaticStyle, staticModificationsStyle]
	);
}

// export default function useStyle (component: Components, modifications?: Style, injectedStyles?: Style, prop?: "style" | `${string}Style`) : StaticStyle
// {
// 	const parseCss = useThemeParser();
// 	const isDark = useDarkMode();

// 	const defaultStyles = useComponentDefaultStyles (component, isDark, prop);
// 	const staticBaseStyle = useStaticStyle (isDark, defaultStyles);
// 	const staticModificationsStyle = useStaticStyle (isDark, modifications);
// 	const staticInjectedStyle = useStaticStyle (isDark, injectedStyles);

// 	const css = useMemo (
// 		() => parseCss (
// 			merge (
// 				{},
// 				staticBaseStyle,
// 				staticInjectedStyle,
// 				staticModificationsStyle
// 			)
// 		),
// 		[parseCss, staticBaseStyle, staticModificationsStyle, staticInjectedStyle]
// 	);
	
// 	return css;
// }