import { Combobox, type Option } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

const options: Option[] = [
	{
		value: "a",
		display: "A"
	},
	{
		value: "b",
		display: "B"
	},
	{
		value: "c",
		display: "C"
	},
	{
		value: "d",
		display: "D"
	},
];

export default function ComboboxArrowDemo ()
{
	const [value, setValue] = useState ("");
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, option: Option) =>
		{
			setValue (option.value);
		},
		[setValue]
	);

	return (
		<Combobox
			label = "Select a value..."
			value = {value}
			options = {options}
			onChange = {handleChange}
			arrowComponent = {{
				closed: "😌",
				open: "🤗"
			}}
		/>
	);
}