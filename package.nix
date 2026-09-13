{
  buildNpmPackage,
  importNpmLock,
  lib,
}:
buildNpmPackage {
  pname = "opencode-firecrawl-ng";
  inherit (lib.importJSON ./package.json) version;

  src = lib.fileset.toSource {
    root = ./.;
    fileset = lib.fileset.unions [
      ./package.json
      ./package-lock.json
      ./index.ts
      ./server.ts
      ./tui.ts
      ./rpc.ts
    ];
  };

  npmDeps = importNpmLock {
    npmRoot = ./.;
  };

  inherit (importNpmLock) npmConfigHook;

  dontBuild = true;

  installPhase = ''
    npm ci --omit=dev
    mkdir $out
    cp index.ts package.json package-lock.json rpc.ts server.ts tui.ts $out/
    cp -r node_modules $out/
  '';
}
