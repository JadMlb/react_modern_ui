import { Combobox, type ComboboxProps, type Option } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";

const options: ComboboxProps["options"] = {
	"Vegetables": [
		{value: "aubergine", display: "Aubergine/Eggplant"},
		{value: "beet", display: "Beetroot"},
		{value: "carrot", display: "Carrot"},
		{value: "peas", display: "Peas"},
	],
	"Fruit": [
		{value: "banana", display: "Banana"},
		{value: "fig", display: "Fig"},
		{value: "kiwi", display: "Kiwi"},
		{value: "orange", display: "Orange"},
	]
};

export default function ComboboxOptionsCategoriesDemo ()
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
		/>
	);
}