import { Input } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function InputNumberDemo ()
{
	const [value, setValue] = useState (10);
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, value: number) =>
		{
			setValue (value);
		},
		[setValue]
	);

	return (
		<Input
			type = "number"
			range = {[10, 20]}
			value = {value}
			onChange = {handleChange}
		/>
	);
}