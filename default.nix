{
  system ? builtins.currentSystem,
  pkgs ? import <nixpkgs> { inherit system; },
}:
pkgs.callPackage ./package.nix { }
