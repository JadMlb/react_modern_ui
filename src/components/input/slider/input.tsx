import * as React from "react";
import { Style, useThemeParser } from "../../../styles";
import { translateSliderStyles, translateSliderThumbStyles } from "./translateSliderStyles";
import { DEFAULT_SLIDER_STYLE, DEFAULT_SLIDER_THUMB_STYLE } from "../../../types/components/Slider/SliderStyle";
import { SliderProps } from "../../../types/components/Slider/SliderProps";

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

		const parseCss = useThemeParser();
		const processedThumbStyle = React.useMemo (
			() => parseCss (translateSliderThumbStyles ({...DEFAULT_SLIDER_THUMB_STYLE, ...thumbStyle})),
			[parseCss, thumbStyle]
		);
		const baseStyle = React.useMemo (
			() => ({
				...DEFAULT_SLIDER_STYLE,
				...style
			}),
			[style]
		);

		const [processedStyle, setProcessedStyle] = React.useState<Style> ({});
		const [css, setCss] = React.useState<Style> ({});

		React.useEffect (
			() =>
			{
				const percentage = ((value - min) / (max - min)) * 100;
				const from = baseStyle?.color ?? "primary";
				const to = baseStyle?.backgroundColor ?? "transparent";

				const fullStyle = {
					...baseStyle,
					background: `linear-gradient(to right, ${from} ${percentage}%, ${to} ${percentage}%)`
				};

				setProcessedStyle (parseCss (translateSliderStyles (fullStyle)));
			},
			[value, setProcessedStyle, baseStyle, min, max, parseCss]
		);

		React.useEffect (
			() => setCss ({...processedThumbStyle, ...processedStyle}),
			[setCss, processedThumbStyle, processedStyle]
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