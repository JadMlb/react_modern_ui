import { OverridableBadgeProps, OverridableBlockSkeletonLoaderProps, OverridableButtonProps, OverridableCardProps, OverridableCheckboxProps, OverridableComboboxProps, OverridableDateTimeInputProps, OverridableDialogProps, OverridableDrawerProps, OverridableDrawerWithDefaultHeaderProps, OverridableLinkProps, OverridableListProps, OverridableMenuProps, OverridableNumberInputProps, OverridablePanelProps, OverridableProgressBarProps, OverridableRadioButtonsGroupProps, OverridableSeparatorProps, OverridableSliderProps, OverridableSwitchProps, OverridableTableProps, OverridableTagProps, OverridableTextInputProps, OverridableTextSkeletonLoaderProps, OverridableToasterProps } from "../components";
import CardStylingProps from "../components/Card/CardStylingProps";
import { CheckboxStylingProps } from "../components/Checkbox/CheckboxStyleProps";
import InputBaseStylingProps from "../components/input/Base/InputBaseStylingProps";
import { OverridableInputBaseProps } from "../components/input/Base/InputBaseProps";
import ListStylingProps from "../components/List/ListStylingProps";
import PanelStylingProps from "../components/Panel/PanelStylingProps";
import DialogProps from "../components/Popups/DialogProps";
import ProgressBarStylingProps from "../components/ProgressBar/ProgressBarStylingProps";
import RadioButtonsGroupStylingProps from "../components/RadioButtonsGroup/RadioButtonsGroupStylingProps";
import SliderStylingProps from "../components/Slider/SliderStylingProps";
import SwitchStylingProps from "../components/Switch/SwitchStylingProps";
import TableStylingProps from "../components/Table/TableStylingProps";
import ToasterStylingProps from "../components/Toaster/ToasterStylingProps";
import StylingProps from "./StylingProps";
import WrappedElementStylingProps from "./WrappedElementStylingProps";

export type Overridable<PropsType, StylesType> = {
	props?: PropsType;
	styles?: StylesType;
};

export type ComponentsOverrides = {
	badge?: Overridable<OverridableBadgeProps, WrappedElementStylingProps>,
	button?: {
		filled?: Overridable<OverridableButtonProps, StylingProps>,
		outlined?: Overridable<OverridableButtonProps, StylingProps>,
		link?: Overridable<OverridableButtonProps, StylingProps>
	},
	card?: Overridable<OverridableCardProps, CardStylingProps>,
	checkbox?: Overridable<OverridableCheckboxProps, CheckboxStylingProps>,
	input?: {
		base?: Overridable<OverridableInputBaseProps, InputBaseStylingProps>,
		text?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		email?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		password?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		search?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		url?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		tel?: Overridable<OverridableTextInputProps, InputBaseStylingProps>,
		number?: Overridable<OverridableNumberInputProps, InputBaseStylingProps>,
		date?: Overridable<OverridableDateTimeInputProps, InputBaseStylingProps>,
		datetime?: Overridable<OverridableDateTimeInputProps, InputBaseStylingProps>,
		time?: Overridable<OverridableDateTimeInputProps, InputBaseStylingProps>,
		month?: Overridable<OverridableDateTimeInputProps, InputBaseStylingProps>,
		week?: Overridable<OverridableDateTimeInputProps, InputBaseStylingProps>,
	},
	link?: Overridable<OverridableLinkProps, StylingProps>,
	list?: Overridable<OverridableListProps, ListStylingProps>,
	menu?: Overridable<OverridableMenuProps, StylingProps>,
	panel?: Overridable<OverridablePanelProps, PanelStylingProps>,
	popups?: {
		backdrop?: Overridable<OverridablePopupBackdropProps, StylingProps>,
		dialog?: Overridable<OverridableDialogProps, DialogProps>,
		drawer?: {
			default?: Overridable<OverridableDrawerProps, DialogProps>,
			withHeader?: Overridable<OverridableDrawerWithDefaultHeaderProps, DialogProps>,
		}
	},
	progressBar?: Overridable<OverridableProgressBarProps, ProgressBarStylingProps>,
	radioButtonsGroup?: Overridable<OverridableRadioButtonsGroupProps, RadioButtonsGroupStylingProps>,
	separator?: Overridable<OverridableSeparatorProps, WrappedElementStylingProps>,
	skeletonLoader?: {
		block?: Overridable<OverridableBlockSkeletonLoaderProps, WrappedElementStylingProps>,
		text?: Overridable<OverridableTextSkeletonLoaderProps, WrappedElementStylingProps>,
	},
	slider?: Overridable<OverridableSliderProps, SliderStylingProps>,
	switch?: Overridable<OverridableSwitchProps, SwitchStylingProps>,
	table?: Overridable<OverridableTableProps, TableStylingProps>,
	tag?: Overridable<OverridableTagProps, StylingProps>,
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