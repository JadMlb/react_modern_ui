import useStyle from "../../../hooks/useStyle";
import { Style } from "../../../types";
import Button from "../button";
import X from "../input_types/x";

interface RadioButtonsGroupTrailingProps
{
	optional?: boolean;
	clearSelection?: () => void;
	style?: Style;
}

export default function RadioButtonsGroupTrailing ({optional, clearSelection, style}: RadioButtonsGroupTrailingProps)
{
	const css = useStyle ("radioButtonsGroup", style, undefined, "clearButtonStyle")
	
	if (!optional)
		return null;
	
	return (
		<Button
			onClick = {clearSelection}
			style = {css}
		>
			<X/>
		</Button>
	);
}