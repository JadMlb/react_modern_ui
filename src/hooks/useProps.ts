import { at, merge } from "lodash";
import { useTheme } from "../styles";
import { Components, ComponentsOverridesTypeForComponent } from "../types";
import { useMemo } from "react";

function useComponentDefaultProps<Component extends Components> (component: Component)
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;
	if (!defaultsForComponent)
		return {};
	return defaultsForComponent.props ?? {};
}

export default function useProps<T> (component: Components, props: T)
{
	const defaultProps = useComponentDefaultProps (component) as T;
	const merged = useMemo (
		() => merge ({}, defaultProps, props),
		[defaultProps, props]
	);
	return merged;
}