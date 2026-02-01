type MeasurementValueType = string;

export type RadiusMeasurementsType = {
	small: MeasurementValueType,
	medium: MeasurementValueType,
	large: MeasurementValueType,
	round: MeasurementValueType
};

export type SpacingMeasurementsType = {
	xxsmall: MeasurementValueType,
	xsmall: MeasurementValueType,
	small: MeasurementValueType,
	medium: MeasurementValueType,
	large: MeasurementValueType,
	xlarge: MeasurementValueType,
	xxlarge: MeasurementValueType
};

export type Measurements = {
	radius: RadiusMeasurementsType,
	spacing: SpacingMeasurementsType;
};

export type PartialMeasurements = {
	radius?: Partial<RadiusMeasurementsType>,
	spacing?: Partial<SpacingMeasurementsType>;
};