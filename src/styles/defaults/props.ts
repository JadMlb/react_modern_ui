import { ComponentsOverrides } from "../../types";
import DEFAULT_BADGE_PROPS from "./components/badge";
import DEFAULT_CARD_PROPS from "./components/card";

export const DEFAULT_COMPONENTS_PROPS = {
	badge: DEFAULT_BADGE_PROPS,
	card: DEFAULT_CARD_PROPS,
} satisfies ComponentsOverrides;