import { ValueInputProps } from "./ValueInputProps";

export interface CommonInputProps extends ValueInputProps
{
	/**
	 * The component to be rendered before the input itself
	 */
	leading?: React.ReactNode;
}