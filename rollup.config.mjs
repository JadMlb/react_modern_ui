import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import packageJson from "./package.json" assert {type: "json"};
import postcss from "rollup-plugin-postcss";

export default [
	{
		input: "src/index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: true,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: true,
			},
		],
		plugins: [
			resolve(),
			commonjs(),
			typescript({ tsconfig: "./tsconfig.json" }),
			postcss (
				{
					extract: file => file.replace (/\.js$/, ".css"),
					minimize: true,
					sourceMap: true
			  	}
			)
		],
		external: ["react", "react-dom", "@emotion/react", "@emotion/styled"]
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [
			dts (
				{
					respectExternal: true,
					compilerOptions: {
						"skipLibCheck": true,
						"skipDefaultLibCheck": true
					}
				}
			)
		],
		external: [/\.css$/, "react", "react-dom", "@emotion/react"],
		preserveModules: true
	},
];