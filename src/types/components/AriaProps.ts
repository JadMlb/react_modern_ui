import { AriaAttributes } from "react";

export default interface AriaProps extends AriaAttributes
{
	role?: string;
	tabIndex?: number;
	[key: `data-${string}`]: string | number | undefined;
}