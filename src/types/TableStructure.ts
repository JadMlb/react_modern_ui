export type TableStructure = {
	/**
	 * The column struture of the table
	 */
	columns: {
		[columnName: string]: {
			/**
			 * The name to be displayed for this column. If not provided, the key used to identify this column is used. 
			 */
			displayName?: string,
			/**
			 * The fields in the `data` property to be added to this column. Different fields are separated by new lines. Fields can be referenced using object accessors. e.g. to access the field "b" under "a", "a.b" can be passed.
			 */
			fields: {
				[fieldName: string]: TableRowField
			}
			/**
			 * Defines the proportion that this column will take relative to the table. **The total proportions must add up to 1**.
			 */
			proportion: number
		}
	},
	/**
	 * Lists the keys of the columns that can be used to sort the rows
	 */
	sortingColumns?: string[]
};

export type TableRowField = {
	type: "number" | "text" | "tag",
	/**
	 * Specifies whether this field is important to display its contents in bold
	 */
	isPrimary?: boolean
}