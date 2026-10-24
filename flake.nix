{
  description = "NinjaIOUtils - nix fmt (treefmt) configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    treefmt-nix.url = "github:numtide/treefmt-nix";
  };

  outputs =
    {
      nixpkgs,
      treefmt-nix,
      ...
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in
    {
      formatter = forAllSystems (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        treefmt-nix.lib.mkWrapper pkgs {
          projectRootFile = "flake.nix";
          programs = {
            nixfmt.enable = true;
          };
          settings.formatter.prettier = {
            command = "${pkgs.bun}/bin/bun";
            options = [
              "node_modules/prettier/bin/prettier.cjs"
              "--write"
            ];
            includes = [
              "*.ts"
              "*.js"
              "*.json"
              "*.md"
            ];
            excludes = [
              "old/*"
              "backend/*"
              "texturepacks/*"
              "docs/*"
              "lib/.generate/*"
              "lib/node_modules/*"
              "lib/bun.lock" # generated
              "lib/lib.d.ts" # generated; formatting would invalidate the declaration map
              "lib/lib.d.ts.map"
              "userscript/node_modules/*"
              "userscript/bun.lock" # generated
            ];
          };
        }
      );
    };
}
