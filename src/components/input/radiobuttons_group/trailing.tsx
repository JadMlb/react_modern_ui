import { StaticStyle } from "../../../types";
import Button from "../button";
import X from "../input_types/x";

interface RadioButtonsGroupTrailingProps
{
	optional?: boolean;
	clearSelection?: () => void;
	style?: StaticStyle;
}

export default function RadioButtonsGroupTrailing ({optional, clearSelection, style}: RadioButtonsGroupTrailingProps)
{
	if (!optional)
		return null;
	
	return (
		<Button
			onClick = {clearSelection}
			css = {style}
		>
			<X/>
		</Button>
	);
}