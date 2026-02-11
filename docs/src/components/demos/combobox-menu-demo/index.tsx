import { Combobox, RadioButtonsGroup, type Option, type Position } from "@jad-mlb/react-modern-ui";
import { useCallback, useState } from "react";
import Container from "./container";

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

export default function ComboboxMenuDemo ()
{
	const [value, setValue] = useState ("");
	const handleChange = useCallback (
		(_: React.ChangeEvent | null, option: Option) =>
		{
			setValue (option.value);
		},
		[setValue]
	);

	const [position, setPosition] = useState<Position> ({horizontal: "left", vertical: "bottom"});
	const [direction, setDirection] = useState<Position> ({horizontal: "right", vertical: "bottom"});
	
	return (
		<>
			<Container>
				<RadioButtonsGroup
					label = "Vertical position"
					options = {[
						{value: "top", display: "Top"},
						{value: "center", display: "Center"},
						{value: "bottom", display: "Bottom"}
					]}
					value = {position?.vertical}
					onChange = {(_, value) => setPosition (old => ({...old, vertical: value!.value as Position["vertical"]}))}
				/>
				<RadioButtonsGroup
					label = "Horizontal position"
					options = {[
						{value: "left", display: "Left"},
						{value: "center", display: "Center"},
						{value: "right", display: "Right"}
					]}
					value = {position?.horizontal}
					onChange = {(_, value) => setPosition (old => ({...old, horizontal: value!.value as Position["horizontal"]}))}
				/>
				<RadioButtonsGroup
					label = "Vertical direction"
					options = {[
						{value: "top", display: "Top"},
						{value: "center", display: "Center"},
						{value: "bottom", display: "Bottom"}
					]}
					value = {direction?.vertical}
					onChange = {(_, value) => setDirection (old => ({...old, vertical: value!.value as Position["vertical"]}))}
				/>
				<RadioButtonsGroup
					label = "Horizontal direction"
					options = {[
						{value: "left", display: "Left"},
						{value: "center", display: "Center"},
						{value: "right", display: "Right"}
					]}
					value = {direction?.horizontal}
					onChange = {(_, value) => setDirection (old => ({...old, horizontal: value!.value as Position["horizontal"]}))}
				/>
			</Container>
			<Combobox
				label = "Select a value..."
				value = {value}
				options = {options}
				onChange = {handleChange}
				menuProps = {{
					position: position,
					direction: direction
				}}
			/>
		</>
	);
}