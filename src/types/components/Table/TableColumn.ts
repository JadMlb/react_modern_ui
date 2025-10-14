type TableColumn = {
	name: string;
	displayName: string;
	width?: number | string,
	align?: "left" | "center" | "right",
	// TODO: add support for vertical span with children prop
	spanH?: number,
	filterable?: boolean,
	sortable?: boolean
	// hide
	// pin
};

export default TableColumn;