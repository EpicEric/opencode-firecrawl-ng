/* opencode-firecrawl-ng: OpenCode plugin that provides tool calls for Firecrawl
 * Copyright (C) 2026 Eric Rodrigues Pires
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for
 * more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <https://www.gnu.org/licenses/>. */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { Plugin } from "@opencode/plugin";

const execFileAsync = promisify(execFile);

async function firecrawl(...args: string[]): Promise<string> {
  try {
    const { stdout } = await execFileAsync("firecrawl", args, {
      maxBuffer: 16 * 1024 * 1024,
    });
    return stdout;
  } catch (error) {
    const stderr = (error as { stderr?: string }).stderr?.trim();
    throw new Error(
      stderr || (error instanceof Error ? error.message : "firecrawl command failed"),
    );
  }
}

export default Plugin.define({
  id: "opencode-firecrawl-ng",
  async setup(ctx) {
    await ctx.tool.transform((editor) => {
      editor.namespace({
        name: "firecrawl",
        description: "Context API to search and scrape the web",
      });
      editor.add({
        name: "scrape",
        description:
          "Scrape a URL into markdown using Firecrawl (handles JavaScript-rendered pages). Use as a fallback for complex scraping scenarios, NOT for simple file downloads with curl or when webfetch works fine.",
        input: {
          type: "object",
          properties: {
            url: { type: "string", description: "URL to scrape" },
          },
          required: ["url"],
          additionalProperties: false,
        },
        options: { namespace: "firecrawl", codemode: true },
        execute: async (input) => {
          const { url } = input as { url: string };
          return { content: await firecrawl("scrape", url) };
        },
      });
      editor.add({
        name: "developer",
        description:
          "Search an index built for coding agents: GitHub issues, merged PRs, repository READMEs, and curated documentation sites. Use as a fallback for research and documentation, NOT for fetching specific files like commits, source code, or API responses.",
        input: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Natural-language developer question or search phrase; express repository, language, topic, and other scoping intent in the text",
            },
          },
          required: ["query"],
          additionalProperties: false,
        },
        options: { namespace: "firecrawl", codemode: true },
        execute: async (input) => {
          const { query } = input as { query: string };
          return { content: await firecrawl("developer", query) };
        },
      });
    });
  },
});
