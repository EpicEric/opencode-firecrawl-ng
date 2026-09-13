# opencode-firecrawl-ng

OpenCode plugin that provides tool calls for Firecrawl.

Currently, [`firecrawl_developer`](https://www.firecrawl.dev/developer-index) and [`firecrawl_scrape`](https://www.firecrawl.dev/scrape) are implemented.

> [!Note]
> Requires OpenCode v2.
>
> LLM disclaimer: Most of the code was generated with large language models.

## Installation

Install Firecrawl CLI:

```bash
npm install -g firecrawl-cli
```

Authenticate with your browser or API key:

```bash
firecrawl login
```

Finally, add the following to your ~/.config/opencode/opencode.json file:

```json
{
  "plugins": ["github:EpicEric/opencode-firecrawl-ng#v2"]
}
```
