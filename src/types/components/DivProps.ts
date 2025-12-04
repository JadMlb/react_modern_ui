export default interface DivProps
{
	role?: string;
	tabIndex?: number;
	[key: `data-${string}`]: string | number | undefined;

	onClick?: React.MouseEventHandler<HTMLDivElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
	onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
	onPointerCancel?: React.PointerEventHandler<HTMLDivElement>;
	onPointerDown?: React.PointerEventHandler<HTMLDivElement>;
	onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
	onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
	onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
	onPointerOut?: React.PointerEventHandler<HTMLDivElement>;
	onPointerOver?: React.PointerEventHandler<HTMLDivElement>;
	onPointerUp?: React.PointerEventHandler<HTMLDivElement>;
	onFocus?: React.FocusEventHandler<HTMLDivElement>;
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLDivElement>;
}