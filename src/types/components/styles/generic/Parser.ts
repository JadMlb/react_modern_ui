import { BasicStyle } from "./BasicStyle";
import { Parsable } from "../Parsable";
import { ParserFactory } from "./ParserFactory";

export class Parser<T extends BasicStyle> implements Parsable<T>
{
	protected forcedTheme: "dark" | "light" | null = null;

	constructor (protected parsers: ParserFactory) {}

	protected getCssPropName (objPropName: string)
	{
		switch (objPropName)
		{
			case "shadow": return "box-shadow";
			case "fontColor": return "color";
			case "underlineColor": return "text-decoration: underline; text-decoration-color"
			default: 
				return objPropName.replace (/[A-Z]/g, match => `-${match.toLowerCase()}`);
		}
	}

	parse (args: T)
	{
		let css = "";

		Object.entries (args)
				.forEach (
					arg =>
					{
						if (arg[0] === "forceTheme")
							this.forcedTheme = arg[1];
						
						let value = arg[1];
						if (value === null)
							value = "unset";
						else if (value instanceof Object || arg[0].toLowerCase().includes ("col") || ["shadow", "border"].includes (arg[0].toLowerCase()))
							value = this.parsers.getParser(arg[0]).parse (arg[1]);

						if (arg[1] instanceof Object && !["shadow"].includes (arg[0]) && !arg[0].startsWith ("border"))
							css += `&:${this.getCssPropName (arg[0])} {${value}}`;
						else
							css += `${this.getCssPropName (arg[0])}: ${value};`;
					}
				);

		return css;
	}
}