import React from "react";
import CheckBox from "./checkbox"
import { useEffect, useState } from "react";

type RadioButtonsGroupProps = {
	name: string,
	childrenLabels: string[],
	defaultValue?: string,
	onChange?: (newValue: string) => void
}

export default function RadioButtonsGroup ({name, childrenLabels, defaultValue, onChange}: RadioButtonsGroupProps)
{
	const [checked, setChecked] = useState<number> (defaultValue ? childrenLabels.indexOf (defaultValue) : 0);

	function updateSelection (newValue: string, index: number)
	{
		setChecked (index);

		if (onChange)
			onChange (newValue);
	}

	useEffect (
		() =>
		{
			if (defaultValue && onChange)
			{
				onChange (defaultValue);
			}
		},
		[]
	);

	return (
		childrenLabels.map (
			(l, index) => <CheckBox
							key = {`radiobutton-${name}-${index}`}
							label = {l}
							isChecked = {checked === index}
							onChange = {() => updateSelection (l, index)}
							singleOption
							/>
		)
	);
}