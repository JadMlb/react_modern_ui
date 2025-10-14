import { Style, spacing } from "../../../../styles";
import X from "./x";

const TRAILING_STYLE = {
	display: "flex",
	gap: spacing.large,
	alignItems: "center",
	width: "fit-content",
	marginLeft: spacing.large
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
	return (
		<div style = {TRAILING_STYLE}>
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