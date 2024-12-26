import { ThemeColourFunction } from "../../../../styles";
import { Parsable } from "../Parsable";
import { ColourParser } from "../colour/ColourParser";
import { Border } from "./Border";

export class BorderParser implements Parsable<Border>
{
	private colourParser: ColourParser;

	constructor (colour: ThemeColourFunction)
	{
		this.colourParser = new ColourParser (colour);
	}

	parse (args: Border): string
	{
		let css = "";

		if (args.width)
			css += args.width + " ";

		css += args.style + " " + this.colourParser.parse (args.color);

		return css;
	}
}