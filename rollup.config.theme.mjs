import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

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
	}
];