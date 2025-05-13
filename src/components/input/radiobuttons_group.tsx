import Checkbox from "./checkbox";
import { useEffect, useState } from "react";
import { RadioButtonsGroupProps } from "../../types/components/RadioButtonsGroup/RadioButtonsGroupProps";

/**
 * Renders a group of radio buttons showing multiple options
 */
export default function RadioButtonsGroup ({className, id, name, optionsLabels: childrenLabels, defaultValue, style, onChange}: RadioButtonsGroupProps)
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
		<div role = "group" className = {className} id = {id}>
		{
			childrenLabels.map (
				(l, index) => <Checkbox
								key = {`radiobutton-${name}-${index}`}
								label = {l}
								state = {checked === index}
								onChange = {() => updateSelection (l, index)}
								style = {{...style, borderRadius: "100%"}}
							/>
			)
		}
		</div>
	);
}