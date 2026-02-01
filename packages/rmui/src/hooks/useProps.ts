import { at, merge } from "lodash";
import { useTheme } from "../styles";
import { Components, ComponentsOverridesTypeForComponent } from "../types";
import { useMemo } from "react";
import useClassNameAndId from "./useClassNameAndId";
import BasicCssStylingProps from "../types/styles/BasicCssStylingProps";

class UnstablePropsPatterns
{
	static isEventHandler (key: string, value: any)
	{
		return key.startsWith ("on") && typeof value === "function";
	}

	static isStatefulValue (key: string)
	{
		return ["value", "selected", "active", "open", "expanded", "visible"].includes (key);
	}

	static isComplexType (value: any)
	{
		return Array.isArray (value) || typeof value === "object" && value !== null;
	}

	static isAlwaysStable (key: string)
	{
		return ["id", "className", "children"].includes (key) || key.toLowerCase().endsWith ("style");
	}
}

function useComponentDefaultProps<Component extends Components> (component: Component)
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = useMemo (
		() => at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>,
		[defaults, component]
	);

	return useMemo (
		() =>
		{
			if (!defaultsForComponent)
				return {};
			return defaultsForComponent.props ?? {};
		},
		[defaultsForComponent]
	);
}

export default function useProps<T extends BasicCssStylingProps> (component: Components, props: T)
{
	const defaultProps = useComponentDefaultProps (component) as T;
	const {className, id, ...rest} = props;
	const classNameAndId = useClassNameAndId (component, {id, className});

	const {stable: stableProps, unstable: unstableProps} = useMemo (
		() =>
		{
			let stable: any = {};
			let unstable: any = {};

			Object.entries (rest)
					.forEach (
						([key, value]) =>
						{
							let isUnstable = !UnstablePropsPatterns.isAlwaysStable (key)
											|| UnstablePropsPatterns.isEventHandler (key, value)
											|| UnstablePropsPatterns.isStatefulValue (key)
											|| UnstablePropsPatterns.isComplexType (value);

							if (isUnstable)
								unstable[key] = value;
							else
								stable[key] = value
						}
					);

			return {stable, unstable};
		},
		[rest]
	);

	const mergedStable = useMemo (
		() => merge ({}, defaultProps, stableProps, classNameAndId),
		[defaultProps, stableProps, classNameAndId]
	);

	const finalProps = useMemo (
		() => ({
			...mergedStable,
			...unstableProps
		} as T),
		[mergedStable, unstableProps]
	);

	return finalProps;
}