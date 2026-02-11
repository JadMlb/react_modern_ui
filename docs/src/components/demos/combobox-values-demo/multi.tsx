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

export default function ComboboxMultiValueDemo ()
{
	const [values, setValues] = useState<string[]> ([]);
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, option: Option) =>
		{
			setValues (
				old =>
				{
					if (!option)
						return [];
					else if (old.findIndex (o => o === option.value) > -1)
						return old.filter (v => v !== option.value);
					return [...old, option.value];
				}
			);
		},
		[setValues]
	);

	return (
		<Combobox
			label = "Select as many values as you want"
			value = {values}
			options = {options}
			onChange = {handleChange}
		/>
	);
}