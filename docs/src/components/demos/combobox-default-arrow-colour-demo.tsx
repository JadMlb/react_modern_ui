import { Combobox, Input, type Option } from "@jad-mlb/react-modern-ui";
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

export default function ComboboxDefaultArrowColourDemo ()
{
	const [value, setValue] = useState ("");
	const [colour, setColour] = useState<string>();
	
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, option: Option) =>
		{
			setValue (option.value);
		},
		[setValue]
	);
	
	const handleColourChange = useCallback (
		(_: React.ChangeEvent | null, value: string | null) =>
		{
			setColour (value ?? undefined);
		},
		[setColour]
	);

	return (
		<>
			<Input
				type = "text"
				value = {colour ?? ""}
				onChange = {handleColourChange}
				optional
				label = "Enter the colour you want"
				hint = "rgb(255, 0, 0), blue, primary, etc."
			/>
			<Combobox
				label = "Select a value..."
				value = {value}
				options = {options}
				onChange = {handleChange}
				defaultArrowComponentColour = {colour}
			/>
		</>
	);
}