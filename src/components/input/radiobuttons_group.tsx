import React from "react";
import CheckBox from "./checkbox"
import { useEffect, useState } from "react";

type RadioButtonsGroupProps = {
	/**
	 * The name of the field that contains the value of this input
	 */
	name: string,
	/**
	 * The labels of the different options. Displayed in their order of appearance.
	 */
	optionsLabels: string[],
	/**
	 * The default value this RadioButtonsGroup should start with. Defaults to the first value. `onChange` event handler fired upon load.
	 */
	defaultValue?: string,
	/**
	 * The change event handler fired when a new value is selected
	 * @param newValue The label of the newly selected value
	 */
	onChange?: (newValue: string) => void
}

/**
 * Renders a group of radio buttons showing multiple options
 */
export default function RadioButtonsGroup ({name, optionsLabels: childrenLabels, defaultValue, onChange}: RadioButtonsGroupProps)
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