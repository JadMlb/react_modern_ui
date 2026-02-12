import { Input } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

export default function InputDatetimeDemo ()
{
	const [value, setValue] = useState<string | Date> (new Date());
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, value: Date | string) =>
		{
			setValue (value);
		},
		[setValue]
	);

	return (
		<Input
			type = "datetime"
			range = {[new Date(), null]}
			value = {value}
			onChange = {handleChange}
		/>
	);
}