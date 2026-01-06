import * as React from "react";
import { translateSliderStyles, translateSliderThumbStyles } from "./translateSliderStyles";
import { SliderProps } from "../../../types/components/Slider/SliderProps";
import { Style } from "../../../types";
import useStyle from "../../../hooks/useStyle";

interface SliderInputProps
{
	id?: string;
	className?: string;
	ref?: React.Ref<HTMLInputElement>;
	name?: string;
	value: number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	min: number;
	max: number;
	step?: number;
	readonly?: boolean;
	disabled?: boolean;
	style?: Style;
	thumbStyle?: Style;
	autoFocus?: SliderProps["autoFocus"];
	defaultValue?: SliderProps["defaultValue"];
	form?: SliderProps["form"];
	onBlur?: SliderProps["onBlur"];
	onFocus?: SliderProps["onFocus"];
	onContextMenu?: SliderProps["onContextMenu"];
	onKeyDown?: SliderProps["onKeyDown"];
	onKeyUp?: SliderProps["onKeyUp"];
}

const SliderInput = React.forwardRef<HTMLInputElement, SliderInputProps> (
	(props, ref) =>
	{
		const {
			thumbStyle,
			style,
			value,
			min,
			max,
			...rest
		} = props;

		const unprocessedThumbCss = useStyle ("slider", thumbStyle, undefined, "thumbStyle");
		const thumbCss = React.useMemo (
			() => translateSliderThumbStyles (unprocessedThumbCss),
			[unprocessedThumbCss]
		);

		const unprocessedBackgroundCss = useStyle ("slider", style);
		const backgroundCss = React.useMemo (
			() =>
			{
				const percentage = ((value - min) / (max - min)) * 100;
				const from = unprocessedBackgroundCss?.color ?? "primary";
				const to = unprocessedBackgroundCss?.backgroundColor ?? "transparent";
				return translateSliderStyles ({
					...unprocessedBackgroundCss,
					background: `linear-gradient(to right, ${from} ${percentage}%, ${to} ${percentage}%)`
				});
			},
			[unprocessedBackgroundCss, value, min, max]
		);

		const css = React.useMemo (
			() => ({
				...thumbCss,
				...backgroundCss
			}),
			[backgroundCss, thumbCss]
		);

		return (
			<input
				ref = {ref}
				type = "range"
				value = {value}
				min = {min}
				max = {max}
				list = "slider-marks"
				css = {css}
				{...rest}
			/>
		);
	}
);

export default SliderInput;