import { BadgeStylingProps, OverridableBadgeProps } from "../components/Badge/BadgeProps";
import { ButtonStylingProps, OverridableButtonProps } from "../components/Button/ButtonProps";
import { CardStylingProps, OverridableCardProps } from "../components/Card/CardProps";
import { CheckboxStylingProps, OverridableCheckboxProps } from "../components/Checkbox/CheckboxProps";
import { OverridableComboboxProps, ComboboxStylingProps } from "../components/Combobox/ComboboxProps";
import { InputBaseStylingProps, OverridableInputBaseProps } from "../components/input/Base/InputBaseProps";
import { GenericDateTimeInputStylingProps, OverridableDateTimeInputProps } from "../components/input/datetime/GenericDateTimeInputProps";
import { NumberInputStylingProps, OverridableNumberInputProps } from "../components/input/number/NumberInputProps";
import { BasicTextInputStylingProps, OverridableTextInputProps } from "../components/input/text/BasicTextInputProps";
import { LinkStylingProps, OverridableLinkProps } from "../components/Link/LinkProps";
import { ListStylingProps, OverridableListProps } from "../components/List/ListProps";
import { MenuStylingProps, OverridableMenuProps } from "../components/Menu/MenuProps";
import { OverridablePanelProps, PanelStylingProps } from "../components/Panel/PanelProps";
import { DialogStylingProps, OverridableDialogProps } from "../components/Popups/DialogProps";
import { DrawerStylingProps, OverridableDrawerProps } from "../components/Popups/DrawerProps";
import { OverridableProgressBarProps, ProgressBarStylingProps } from "../components/ProgressBar/ProgressBarProps";
import { OverridableRadioButtonsGroupProps, RadioButtonsGroupStylingProps } from "../components/RadioButtonsGroup/RadioButtonsGroupProps";
import { OverridableSeparatorProps, SeparatorStylingProps } from "../components/Separator/SeparatorProps";
import { BlockSkeletonLoaderStyleProps, OverridableBlockSkeletonLoaderProps } from "../components/SkeletonLoader/BlockSkeletonLoaderProps";
import { OverridableTextSkeletonLoaderProps, TextSkeletonLoaderStyleProps } from "../components/SkeletonLoader/TextSkeletonLoaderProps";
import { OverridableSliderProps, SliderStylingProps } from "../components/Slider/SliderProps";
import { OverridableSwitchProps, SwitchStylingProps } from "../components/Switch/SwitchProps";
import { OverridableTableProps, TableStylingProps } from "../components/Table/TableProps";
import { OverridableTagProps, TagStylingProps } from "../components/Tag/TagProps";
import { OverridableToasterProps, ToasterStylingProps } from "../components/Toaster/ToasterProps";

export type Overridable<PropsType, StylesType> = {
	props?: PropsType;
	styles?: StylesType;
};

export type ComponentsOverrides = {
	badge?: Overridable<OverridableBadgeProps, BadgeStylingProps>,
	button?: {
		filled?: Overridable<OverridableButtonProps, ButtonStylingProps>,
		outlined?: Overridable<OverridableButtonProps, ButtonStylingProps>,
		link?: Overridable<OverridableButtonProps, ButtonStylingProps>
	},
	card?: Overridable<OverridableCardProps, CardStylingProps>,
	checkbox?: Overridable<OverridableCheckboxProps, CheckboxStylingProps>,
	combobox?: Overridable<OverridableComboboxProps, ComboboxStylingProps>,
	input?: {
		base?: Overridable<OverridableInputBaseProps, InputBaseStylingProps>,
		text?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		email?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		password?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		search?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		url?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		tel?: Overridable<OverridableTextInputProps, BasicTextInputStylingProps>,
		number?: Overridable<OverridableNumberInputProps, NumberInputStylingProps>,
		date?: Overridable<OverridableDateTimeInputProps, GenericDateTimeInputStylingProps>,
		datetime?: Overridable<OverridableDateTimeInputProps, GenericDateTimeInputStylingProps>,
		time?: Overridable<OverridableDateTimeInputProps, GenericDateTimeInputStylingProps>,
		month?: Overridable<OverridableDateTimeInputProps, GenericDateTimeInputStylingProps>,
		week?: Overridable<OverridableDateTimeInputProps, GenericDateTimeInputStylingProps>,
	},
	link?: Overridable<OverridableLinkProps, LinkStylingProps>,
	list?: Overridable<OverridableListProps, ListStylingProps>,
	menu?: Overridable<OverridableMenuProps, MenuStylingProps>,
	panel?: Overridable<OverridablePanelProps, PanelStylingProps>,
	dialog?: Overridable<OverridableDialogProps, DialogStylingProps>,
	drawer?: Overridable<OverridableDrawerProps, DrawerStylingProps>,
	progressBar?: Overridable<OverridableProgressBarProps, ProgressBarStylingProps>,
	radioButtonsGroup?: Overridable<OverridableRadioButtonsGroupProps, RadioButtonsGroupStylingProps>,
	separator?: Overridable<OverridableSeparatorProps, SeparatorStylingProps>,
	skeletonLoader?: {
		block?: Overridable<OverridableBlockSkeletonLoaderProps, BlockSkeletonLoaderStyleProps>,
		text?: Overridable<OverridableTextSkeletonLoaderProps, TextSkeletonLoaderStyleProps>,
	},
	slider?: Overridable<OverridableSliderProps, SliderStylingProps>,
	switch?: Overridable<OverridableSwitchProps, SwitchStylingProps>,
	table?: Overridable<OverridableTableProps, TableStylingProps>,
	tag?: Overridable<OverridableTagProps, TagStylingProps>,
	toaster?: Overridable<OverridableToasterProps, ToasterStylingProps>
};

type NoUndef<T> = Exclude<T, undefined>;

type NestedKeys<T extends object> = {
	[K in keyof NoUndef<T>]-?: NoUndef<T[K]> extends Overridable<any, any> ?
						K & string :
						NoUndef<T[K]> extends object ?
							`${K & string}.${NestedKeys<NoUndef<T[K]>>}` :
							K & string
}[keyof T];

type NestedPropType<T, Path extends string> = Path extends `${infer K}.${infer Rest}` ?
											K extends keyof T ?
												NestedPropType<NoUndef<T[K]>, Rest> : never :
											Path extends keyof T ?
												NoUndef<T[Path]> : never;

export type Components = NestedKeys<ComponentsOverrides>;
export type ComponentsOverridesTypeForComponent<Path extends string> = NestedPropType<ComponentsOverrides, Path>;