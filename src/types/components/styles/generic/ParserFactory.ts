import { ThemeColourFunction } from "../../../../styles";
import { ColourParser } from "../colour/ColourParser";
import { ShadowParser } from "../shadow/ShadowParser";
import { Parser } from "./Parser";

export class ParserFactory
{
	constructor (private colour: ThemeColourFunction) {}
	
	getParser (type: string)
	{
		if (type.toLowerCase().includes ("col"))
			return new ColourParser (this.colour);
		else if (type === "shadow")
			return new ShadowParser (this.colour);
		else
			return new Parser (this);
	}
}