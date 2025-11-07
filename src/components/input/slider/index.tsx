import * as React from "react";
import { SliderProps } from "../../../types/components/Slider/SliderProps";
import { Option } from "../../../types";
import Options from "./options";
import Marks from "./marks";
import styled from "@emotion/styled";
import SliderInput from "./input";

const SliderContainer = styled.div
`
	display: flex;
	flex-direction: column;
	width: fit-content;
`;

function labelsToMap (labels?: Option[])
{
	if (!labels || labels.length === 0)
		return {};

	return Object.fromEntries (
		labels.map (
			l => [l.value, l.display]
		)
	);
}

function generateDivisionsAtInterval (interval: number, min: number, max: number, labels?: Option[]): Option[]
{
	const divs: Option[] = [];
	const mappedLabels = labelsToMap (labels);
	const shouldOnlyRenderSpecifiedLabels = !!labels && labels.length > 0;
	for (var i = min + interval; i < max; i += interval)
	{
		const value = `${i}`;
		let display: string;
		if (shouldOnlyRenderSpecifiedLabels)
		{
			const foundDisplay = mappedLabels[value];
			if (foundDisplay)
				display = foundDisplay;
			else
				display = "";
		}
		else
			display = value;

		divs.push ({value, display});
	}
	return divs;
}

export default function Slider (props: SliderProps)
{
	const {
		id,
		className,
		ref,
		style,
		name,
		min = 0,
		max = 100,
		step = 1,
		stepsLabels,
		value,
		thumbStyle,
		onChange,
		disabled,
		readonly
	} = props;

	const [innerValue, setInnerValue] = React.useState (value ?? min);

	function handleChange (e: React.ChangeEvent<HTMLInputElement>)
	{
		if (readonly || disabled)
			return;

		const val = +e.target.value;
		if (Number.isNaN (val))
			return;

		setInnerValue  (val);
		onChange?. (e, val);
	}

	const divisions = React.useMemo (
		() =>
		{
			if (stepsLabels === undefined)
				return [];

			if (stepsLabels === true)
				return generateDivisionsAtInterval (step, min, max);
			if (typeof stepsLabels === "number")
				return generateDivisionsAtInterval (stepsLabels, min, max);
			return generateDivisionsAtInterval (step, min, max, stepsLabels);
		},
		[stepsLabels, step, min, max]
	);

	return (
		<SliderContainer>
			<SliderInput
				id = {id}
				className = {className}
				name = {name}
				ref = {ref}
				value = {innerValue}
				onChange = {handleChange}
				min = {min}
				max = {max}
				step = {step}
				readonly = {readonly}
				disabled = {disabled}
				style = {style}
				thumbStyle = {thumbStyle}
			/>
			<Options divisions = {divisions}/>
			<Marks style = {style} divisions = {divisions}/>
		</SliderContainer>
	);
}