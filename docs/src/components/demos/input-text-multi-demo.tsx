import { Input } from "@jad-mlb/react-modern-ui";

export default function InputTextMultiDemo ()
{
	return (
		<Input
			type = "text"
			maxLength = {20}
			multiline
			displayLength
		/>
	);
}