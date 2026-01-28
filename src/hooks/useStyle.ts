import { useCallback, useMemo } from "react";
import { useDarkMode, useTheme, useThemeParser } from "../styles";
import { at, merge } from "lodash";
import { Components, ComponentsOverridesTypeForComponent, Style } from "../types";
import BasicCssStylingProps from "../types/styles/BasicCssStylingProps";

export function useStaticStyleWrapper<T> (style?: Style<T>)
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
export default function useStyle<InstancePropsType extends BasicCssStylingProps> (component: Components, instanceProps: InstancePropsType, modifications?: Style<InstancePropsType>, prop?: "style" | `${string}Style`)
{
	const isSystemDark = useDarkMode(); // prevent react from panicking when hooks call order change
	const isDark = instanceProps?.forceMode ? instanceProps.forceMode === "dark" : isSystemDark;
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