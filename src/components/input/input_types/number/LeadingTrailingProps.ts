import * as React from "react";

export default interface LeadingTrailingProps
{
	children?: React.ReactNode;
	disabled?: boolean;
	onChange?: () => void;
}