import { COLOURS_ALT_NAMES, Colour } from "../../../Colours";
import { Parsable } from "../Parsable";

export class ColourParser implements Parsable<string | null>
{
	constructor (private colour: (col: Colour) => string) {}

	parse (value: string | null): string
	{
		if (value === null)
			return "none";
		if (Object.keys(COLOURS_ALT_NAMES).includes (value))
			return this.colour (value as unknown as Colour);
		return value;
	}
}