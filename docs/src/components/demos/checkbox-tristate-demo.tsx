import { CheckBox } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function CheckboxTristateDemo ()
{
	const [value, setValue] = useState<0 | 1 | 2> (0);
	const handleChange = useCallback (
		() => 
		{
			setValue (
				old =>
					((old + 1) % 3) as 0 | 1 | 2
			);
		},
		[setValue]
	);

	return (
		<CheckBox
			label = "I am in tristate mode, click me to cycle through my states"
			value = {value}
			onChange = {handleChange}
		/>
	);
}