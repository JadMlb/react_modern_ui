import { at } from "lodash";
import { useTheme } from "../styles";
import { Components, ComponentsOverridesTypeForComponent } from "../types";

type ClassNameAndId = {
	className: string | undefined;
	id: string | undefined;
};

function tryMergeStringsWithSpace (s1: string | undefined, s2: string | undefined)
{
	if (!s1 && !s2)
		return undefined;
	if (!s1)
		return s2;
	if (!s2)
		return s1;
	return `${s1} ${s2}`;
}

export default function useClassNameAndId<Component extends Components> (component: Components, classNameOrId: Partial<ClassNameAndId>) : ClassNameAndId
{
	const {theme: {defaults}} = useTheme();
	const defaultsForComponent = at(defaults, [component])[0] as ComponentsOverridesTypeForComponent<Component>;

	const defaultClassName = defaultsForComponent.styles?.className as string | undefined;
	const defaultId = defaultsForComponent.styles?.id as string | undefined;

	return {
		className: tryMergeStringsWithSpace (defaultClassName, classNameOrId.className),
		id: classNameOrId.id ?? defaultId
	};
}