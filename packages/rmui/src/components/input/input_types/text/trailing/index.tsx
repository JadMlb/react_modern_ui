import NonTextTextualInputProps from "../../../../../types/components/input/text/NonTextTextualInputProps";
import Trailing from "../../trailing/trailing";
import TrailingProps from "../../trailing/TrailingProps";
import ShowHideButton from "./show_hide";
import Small from "./small";

interface TextInputTrailing extends TrailingProps
{
	type: NonTextTextualInputProps["type"] | "text";
	displayType: NonTextTextualInputProps["type"] | "text";
	handleDisplayChange: () => void;
	multiline?: boolean;
	maxCharCount?: number;
	shownValue: string;
	displayLength?: boolean;
}

export default function TextInputTrailing ({type, displayType, handleDisplayChange, multiline, maxCharCount, shownValue, displayLength, ...parentProps}: TextInputTrailing)
{
	return (
		<Trailing {...parentProps}>
			{
				type === "text" && multiline && maxCharCount !== undefined && displayLength &&
					<Small>{shownValue.length}/{maxCharCount}</Small>
			}
			{
				type === "password" &&
				<ShowHideButton
					shown = {displayType === "text"}
					onClick = {handleDisplayChange}
				/>
			}
		</Trailing>
	);
}