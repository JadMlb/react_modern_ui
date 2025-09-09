import React from "react";
import { Option, RenderOptionFunction } from "../../../../types";

interface OptionsRendererPropsBase
{
	value?: any;
	onClick?: (e: React.ChangeEvent | null, option: Option) => void;
	renderOption: RenderOptionFunction;
}

interface SingleOptionRendererProps extends OptionsRendererPropsBase
{
	options: Option[];
}

function SingleOptionRenderer ({options, value, onClick, renderOption}: SingleOptionRendererProps)
{
	const selectionMap = Array.isArray (value) ?
								options.map (o => value.includes (o.value)) :
								options.map (o => value === o.value);
		
	return options.map (
		(o, i) => renderOption (o, selectionMap[i], onClick)
	);
}

interface ComboboxOptionsRendererProps extends OptionsRendererPropsBase
{
	options: Option[] | {[category: string]: Option[]};
	disabled?: boolean;
	readonly?: boolean;
}

export default function ComboboxOptionsRenderer ({options, value, disabled, readonly, renderOption, onClick}: ComboboxOptionsRendererProps)
{
	if (readonly || disabled)
		return null;
	
	if (Array.isArray (options))
		return (
			<SingleOptionRenderer
				value = {value}
				options = {options}
				renderOption = {renderOption}
				onClick = {onClick}
			/>
		);
	
	return Object.entries (options)
					.map (
						([category, options]) => (
							<React.Fragment key = {`rmui-combobox-grp-${category}`}>
								<small>{category}</small>
								<SingleOptionRenderer
									value = {value}
									options = {options}
									renderOption = {renderOption}
									onClick = {onClick}
								/>
							</React.Fragment>
						)
					);
}