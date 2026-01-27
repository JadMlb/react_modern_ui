import BaseProps from "./BaseProps";

export default interface DivProps extends BaseProps
{
	onClick?: React.MouseEventHandler<HTMLElement>;
	onContextMenu?: React.MouseEventHandler<HTMLElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLElement>;
	onMouseMove?: React.MouseEventHandler<HTMLElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLElement>;
	onPointerCancel?: React.PointerEventHandler<HTMLElement>;
	onPointerDown?: React.PointerEventHandler<HTMLElement>;
	onPointerEnter?: React.PointerEventHandler<HTMLElement>;
	onPointerLeave?: React.PointerEventHandler<HTMLElement>;
	onPointerMove?: React.PointerEventHandler<HTMLElement>;
	onPointerOut?: React.PointerEventHandler<HTMLElement>;
	onPointerOver?: React.PointerEventHandler<HTMLElement>;
	onPointerUp?: React.PointerEventHandler<HTMLElement>;
	onFocus?: React.FocusEventHandler<HTMLElement>;
	onBlur?: React.FocusEventHandler<HTMLElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
}