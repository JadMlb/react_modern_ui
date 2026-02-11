import { Combobox, type OnChangeFunction, type Option } from "@jad-mlb/react-modern-ui";
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

function renderOption (option: Option, selected?: boolean, onClick?: OnChangeFunction<Option>)
{
	return (
		<div onClick = {() => onClick?. (null, option)}>
			{selected && "✅ "}
			<strong>{option.display}</strong>
		</div>
	);
}

export default function ComboboxRenderOptionDemo ()
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
			renderOption = {renderOption}
		/>
	);
}