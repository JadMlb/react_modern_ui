import * as React from "react";
import { SliderProps } from "../../../types/components/Slider/SliderProps";
import { Option } from "../../../types";
import Options from "./options";
import Marks from "./marks";
import SliderInput from "./input";
import useProps from "../../../hooks/useProps";
import SliderContainer from "./container";
import Labels from "./labels";
import useStyle from "../../../hooks/useStyle";
import { translateSliderStyles, translateSliderThumbStyles } from "./translateSliderStyles";

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

const Slider = React.forwardRef<HTMLInputElement, SliderProps> (
	(instanceProps, ref) =>
	{
		const props = useProps ("slider", instanceProps);
		const {
			style,
			min,
			max,
			step,
			stepsLabels,
			value,
			thumbStyle,
			onChange,
			disabled,
			readonly,
			vertical,
			parentStyle,
			as,
			...inputProps
		} = props;

		const parentCss = useStyle ("slider", props, parentStyle, "parentStyle");
		const unprocessedThumbCss = useStyle ("slider", props, thumbStyle, "thumbStyle");
		const thumbCss = React.useMemo (
			() => translateSliderThumbStyles (unprocessedThumbCss),
			[unprocessedThumbCss]
		);

		const unprocessedBackgroundCss = useStyle ("slider", props, style);
		const backgroundCss = React.useMemo (
			() => translateSliderStyles (unprocessedBackgroundCss),
			[unprocessedBackgroundCss, value, min, max]
		);

		const css = React.useMemo (
			() => ({
				...thumbCss,
				...backgroundCss
			}),
			[backgroundCss, thumbCss]
		);

		const innerRef = React.useRef<HTMLInputElement | null> (null);

		React.useImperativeHandle (
			ref,
			() => innerRef.current!
		);

		function handleChange (e: React.ChangeEvent<HTMLInputElement>)
		{
			if (readonly || disabled)
				return;

			const val = +e.target.value;
			if (Number.isNaN (val))
				return;

			onChange?. (e, val);
		}

		const divisions = React.useMemo (
			() =>
			{
				if (stepsLabels === undefined)
					return [];

				if (stepsLabels === true)
					return generateDivisionsAtInterval (step!, min!, max!);
				if (typeof stepsLabels === "number")
					return generateDivisionsAtInterval (stepsLabels, min!, max!);
				return generateDivisionsAtInterval (step!, min!, max!, stepsLabels);
			},
			[stepsLabels, step, min, max]
		);

		return (
			<SliderContainer style = {parentCss} as = {as}>
				<SliderInput
					ref = {innerRef}
					value = {value ?? min ?? 0}
					min = {min!}
					max = {max!}
					step = {step}
					onChange = {handleChange}
					style = {css}
					{...inputProps}
				/>
				<Options divisions = {divisions}/>
				<Marks style = {style} divisions = {divisions}/>
				<Labels style = {style} divisions = {divisions}/>
			</SliderContainer>
		);
	}
);

export default Slider;