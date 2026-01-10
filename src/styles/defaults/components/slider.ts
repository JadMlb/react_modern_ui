import { Overridable, OverridableSliderProps, SliderStylingProps, } from "../../../types";

const DEFAULT_SLIDER_PROPS: Overridable<OverridableSliderProps, SliderStylingProps> = {
	props: {
		min: 0,
		max: 100,
		step: 1
	},
	styles: {
		style: (_, {value = 0, min = 0, max = 100}) =>
		{
			const percentage = ((value - min) / (max - min)) * 100;
			return {
				cursor: "pointer",
				color: "primary",
				backgroundColor: "transparent",
				height: "spacing.xsmall",
				margin: "unset",
				borderRadius: "radius.small",
				border: "1px solid gray",
				background: `linear-gradient(to right, primary ${percentage}%, transparent ${percentage}%)`
			};
		},
		thumbStyle: {
			width: 10,
			height: 10,
			marginTop: "calc(-2.5px - 1px)",
			borderRadius: "radius.round",
			backgroundColor: "primary",
		},
		parentStyle: {
			display: "flex",
			flexDirection: "column",
			width: 200
		}
	}
};

export default DEFAULT_SLIDER_PROPS;