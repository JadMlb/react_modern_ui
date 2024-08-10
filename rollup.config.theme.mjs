import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
	{
		input: "theme/index.ts",
		output: [
			{
			file: "dist/cjs/theme.js",
			format: "cjs",
			sourcemap: true,
			},
			{
			file: "dist/esm/theme.js",
			format: "esm",
			sourcemap: true,
			},
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
		],
	},
	{
		input: "dist/esm/types/theme.d.ts",
		output: [{ file: "dist/theme.d.ts", format: "esm" }],
		plugins: [dts()],
	},
];