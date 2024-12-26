import { ThemeColourFunction } from "../../../../styles";
import { Parsable } from "../Parsable";
import { ColourParser } from "../colour/ColourParser";
import { Shadow } from "./Shadow";

export class ShadowParser implements Parsable<Shadow>
{
	private colourParser: ColourParser;
	
	constructor (protected readonly colour: ThemeColourFunction)
	{
		this.colourParser = new ColourParser (colour);
	}

	parse (args: Shadow): string
	{
		let str = `${args.offset.x}px ${args.offset.y}px`;

		if (args.inset)
			str = "inset " + str;

		if (args.blur)
			str += ` ${args.blur}px`;

		if (args.spread)
			str += ` ${args.spread}px`;

		if (args.colour)
			str += ` ${this.colourParser.parse (args.colour)}`;

		return str;
	}
}