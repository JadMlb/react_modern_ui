import { at, merge } from "lodash";
import { useTheme } from "../styles";
import { Components, ComponentsOverridesTypeForComponent } from "../types";
import { useMemo } from "react";
import useClassNameAndId from "./useClassNameAndId";
import BasicCssStylingProps from "../types/styles/BasicCssStylingProps";

function useComponentDefaultProps<Component extends Components> (component: Component)
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;
	if (!defaultsForComponent)
		return {};
	return defaultsForComponent.props ?? {};
}

export default function useProps<T extends BasicCssStylingProps> (component: Components, props: T)
{
	const defaultProps = useComponentDefaultProps (component) as T;
	const classNameAndId = useClassNameAndId (component, {id: props.id, className: props.className});
	const merged = useMemo (
		() => merge ({}, defaultProps, props, classNameAndId),
		[defaultProps, props, classNameAndId]
	);
	return merged;
}