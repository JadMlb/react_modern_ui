import { ThemeColourFunction } from "../../../../styles";
import { BorderParser } from "../border/BoderParser";
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
		else if (type === "border")
			return new BorderParser (this.colour);
		else
			return new Parser (this);
	}
}