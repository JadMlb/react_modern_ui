import * as React from "react";
import { SliderProps } from "../../../types/components/Slider/SliderProps";
import { StaticStyle } from "../../../types";
import AriaProps from "../../../types/components/AriaProps";

interface SliderInputProps extends AriaProps
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
	readOnly?: boolean;
	disabled?: boolean;
	style?: StaticStyle;
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
			style,
			value,
			min,
			max,
			...rest
		} = props;

		return (
			<input
				ref = {ref}
				type = "range"
				value = {value}
				min = {min}
				max = {max}
				list = "slider-marks"
				css = {style}
				{...rest}
			/>
		);
	}
);

export default SliderInput;