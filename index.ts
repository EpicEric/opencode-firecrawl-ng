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

import { type Plugin, tool } from "@opencode-ai/plugin";

const qdrByTbs = {
  hour: "qdr:h",
  day: "qdr:d",
  week: "qdr:w",
  month: "qdr:m",
  year: "qdr:y",
};

export const FirecrawlNgPlugin: Plugin = async ({ $ }) => ({
  tool: {
    "firecrawl-search": tool({
      description: "Search the web using Firecrawl.",
      args: {
        query: tool.schema.string().describe("Search query"),
        tbs: tool.schema
          .enum(["hour", "day", "week", "month", "year"])
          .optional()
          .describe(
            "Restrict results to a recent time window. Only set when the user explicitly asks for time-restricted results (e.g. 'latest', 'this week', 'past month'); omit otherwise.",
          ),
      },
      execute: ({ query, tbs }) =>
        $`firecrawl search ${query} ${tbs ? ["--tbs", qdrByTbs[tbs]] : []}`.text(),
    }),
    "firecrawl-scrape": tool({
      description:
        "Scrape a URL into markdown using Firecrawl (handles JavaScript-rendered pages). Use as a fallback for complex scraping scenarios, NOT for simple file downloads with curl or when webfetch works fine.",
      args: {
        url: tool.schema.string().describe("URL to scrape"),
      },
      execute: ({ url }) => $`firecrawl scrape ${url}`.text(),
    }),
    "firecrawl-developer": tool({
      description:
        "Search an index built for coding agents: GitHub issues, merged PRs, repository READMEs, and curated documentation sites. Use as a fallback for research and documentation, NOT for fetching specific files like commits, source code, or API responses.",
      args: {
        query: tool.schema
          .string()
          .describe(
            "Natural-language developer question or search phrase; express repository, language, topic, and other scoping intent in the text",
          ),
      },
      execute: ({ query }) => $`firecrawl developer ${query}`.text(),
    }),
  },
});
