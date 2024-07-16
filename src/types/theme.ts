type ThemeType = {
	mode: "dark" | "light" | "auto"
	primary: {
		dark: string,
		medium: string,
		light: string
	},
	accent: {
		dark: string,
		medium: string,
		light: string
	},
	neutral: {
		dark: string,
		medium: string,
		light: string
	},
	gray: {
		dark: string,
		medium: string,
		light: string
	},
	affirmative: {
		dark: string,
		medium: string,
		light: string
	},
	error: {
		dark: string,
		medium: string,
		light: string
	},
	alert: {
		dark: string,
		medium: string,
		light: string
	}
};

export default ThemeType;