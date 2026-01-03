import { useMemo } from "react";
import { useThemeParser } from "../../../../styles";
import X from "../x";
import { Style } from "../../../../types";

const TRAILING_STYLE = {
	display: "flex",
	gap: "spacing.large",
	alignItems: "center",
} satisfies Style;

interface ComboboxTrailingProps
{
	optional?: boolean;
	value?: any;
	disabled?: boolean;
	readonly?: boolean;
	expanded?: boolean;
	arrowComponent: {open: React.ReactNode, closed: React.ReactNode};
	onChange?: (e: React.ChangeEvent<Element> | null, value: any) => void;
}

export default function ComboboxTrailing ({optional, value, expanded, arrowComponent, disabled, readonly, onChange}: ComboboxTrailingProps)
{
	const parseCss = useThemeParser();
	const WRAPPER_STYLE = useMemo (
		() => parseCss (TRAILING_STYLE),
		[parseCss]
	);
	
	return (
		<div style = {WRAPPER_STYLE}>
			{
				optional && value && (value?.length ?? 0) > 0 &&
				<X
					large
					onClick = {
						e =>
						{
							e.stopPropagation();
							e.preventDefault();
							if (!disabled && !readonly) 
								onChange?. (null, null);
						}
					}
				/>
			}
			{arrowComponent[expanded ? "open" : "closed"]}
		</div>
	);
}