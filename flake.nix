{
  description = "IDCard image demo";

  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = nixpkgs.legacyPackages.${system};

      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            yarn

            nodePackages.typescript-language-server
            nodePackages.prettier
            # nodePackages.eslint
            electron
          ];
        };
      });
}
