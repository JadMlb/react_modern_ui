export interface Parsable<T>
{
	/**
	 * Function that parses the object containing the styles definition and returns the css representation
	 * @param args the styles object
	 * @returns a CSS string rendering the same style
	 */
	parse: (args: T) => string;
}