import { RadiusMeasurementsType, SpacingMeasurementsType } from "../../types";

export const radius = {
	small: "7px",
	normal: "12px",
	medium: "15px",
	large: "20px",
	round: "50%"
};

export const spacing = {
	xxsmall: "2px",
	xsmall: "5px",
	small: "7px",
	normal: "10px",
	medium: "12px",
	large: "15px",
	xlarge: "25px",
	xxlarge: "35px"
};

export const DEFAULT_RADIUS = {
	small: "7px",
	medium: "15px",
	large: "20px",
	round: "50%"
} satisfies RadiusMeasurementsType;

export const DEFAULT_SPACING = {
	xxsmall: "2px",
	xsmall: "5px",
	small: "7px",
	medium: "12px",
	large: "15px",
	xlarge: "25px",
	xxlarge: "35px"
} satisfies SpacingMeasurementsType;