import { forwardRef, useEffect, useMemo, useState } from "react";
import { Style, useThemeParser } from "../../../styles";
import { translateSliderStyles, translateSliderThumbStyles } from "./translateSliderStyles";
import { DEFAULT_SLIDER_STYLE, DEFAULT_SLIDER_THUMB_STYLE } from "../../../types/components/Slider/SliderStyle";

interface SliderInputProps
{
	id?: string;
	className?: string;
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
}

const SliderInput = forwardRef<HTMLInputElement, SliderInputProps> (
	(props, ref) =>
	{
		const {
			id,
			className,
			name,
			value,
			onChange,
			min,
			max,
			step,
			readonly,
			disabled,
			style,
			thumbStyle
		} = props;

		const parseCss = useThemeParser();
		const processedThumbStyle = useMemo (
			() => parseCss (translateSliderThumbStyles ({...DEFAULT_SLIDER_THUMB_STYLE, ...thumbStyle})),
			[parseCss, thumbStyle]
		);
		const baseStyle = useMemo (
			() => ({
				...DEFAULT_SLIDER_STYLE,
				...style
			}),
			[style]
		);

		const [processedStyle, setProcessedStyle] = useState<Style> ({});
		const [css, setCss] = useState<Style> ({});

		useEffect (
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

		useEffect (
			() => setCss ({...processedThumbStyle, ...processedStyle}),
			[setCss, processedThumbStyle, processedStyle]
		);

		return (
			<input
				id = {id}
				className = {className}
				name = {name}
				ref = {ref}
				type = "range"
				value = {value}
				onChange = {onChange}
				min = {min}
				max = {max}
				step = {step}
				readOnly = {readonly}
				disabled = {disabled}
				list = "slider-marks"
				css = {css}
			/>
		);
	}
);

export default SliderInput;