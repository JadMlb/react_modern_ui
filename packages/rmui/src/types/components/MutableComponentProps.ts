export default interface MutableComponentProps
{
	/**
	 * Renders the component as this html element
	 * @default "div"
	 */
	as?: keyof HTMLElementTagNameMap;
}