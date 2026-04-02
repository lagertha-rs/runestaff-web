// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import asmGrammar from "@shikijs/langs/asm";

// https://astro.build/config
export default defineConfig({
	site: "https://rune.lagertha-vm.com/",
	image: { service: { entrypoint: "astro/assets/services/noop" } },
	session: { driver: "cookie" },
	integrations: [
		starlight({
			title: "runestaff",
			description: "Java-assembly language for Lagertha VM",
			customCss: ["./src/styles/starlight.css"],
			plugins: [
				catppuccin({
					dark: { flavor: "macchiato", accent: "sky" },
					light: { flavor: "latte", accent: "sky" },
				}),
			],
			expressiveCode: {
				shiki: {
					langs: [
						// Add rune language as alias of asm
						{
							...asmGrammar[0],
							name: "rns",
						},
					],
				},
			},
			sidebar: [
				{ label: "Home", link: "/" },
				{ label: "Updates", link: "/blog/" },
				{ label: "Documentation", link: "/docs/" },
				{
					label: "Syntax Reference",
					collapsed: false,
					items: [
						{ label: "Overview", link: "/syntax/" },
						{ label: "Types and Operands", link: "/syntax/keywords-and-operands/" },
						{ label: "Directives", link: "/syntax/directives/" },
						{ label: "Instructions", link: "/syntax/instructions/" },
					],
				},
				{ label: "Error Reference", link: "/errors/" },
			],
			head: [
				{
					tag: "script",
					content: `
						if (window.location.pathname.startsWith("/errors/")) {
							document.documentElement.classList.add("error-page");
						}
					`,
				},
			],
		}),
		mdx(),
		sitemap(),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: false,
		},
		imageService: "compile",
	}),
	vite: {
		ssr: {
			external: ["sharp"],
			noExternal: ["@astrojs/starlight/**"],
		},
	},
});
