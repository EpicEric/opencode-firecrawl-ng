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

// This plugin is server-only: tools are registered in the server-side setup.
// The TUI host activates any plugin whose `tui` entrypoint resolves, so export
// a valid but inert TUI definition here instead of the server plugin (whose
// setup would crash on the TUI context, which has no tool domain).
export default {
  id: "opencode-firecrawl-ng",
  setup() {},
};
