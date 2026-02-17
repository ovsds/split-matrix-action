# Split Matrix Action

[![CI](https://github.com/ovsds/split-matrix-action/workflows/Check%20PR/badge.svg)](https://github.com/ovsds/split-matrix-action/actions?query=workflow%3A%22%22Check+PR%22%22)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Split%20Matrix-blue.svg)](https://github.com/marketplace/actions/split-matrix)

Splits a JSON array into groups for GitHub Actions matrix strategy.

## Usage

### Example

```yaml
jobs:
  split-matrix:
    steps:
      - name: Split Matrix
        id: split-matrix
        uses: ovsds/split-matrix-action@v1
        with:
          matrix: '["pkg-1", "pkg-2", "pkg-3", "pkg-4", "pkg-5"]'
          target-group-size: 2
          result-item-prefix: "/data/"

      - name: Use matrix
        run: echo '${{ steps.split-matrix.outputs.matrix }}'
        # Output: ["/data/pkg-1 /data/pkg-2","/data/pkg-3 /data/pkg-4","/data/pkg-5"]
```

### Action Inputs

```yaml
inputs:
  matrix:
    description: |
      JSON array of strings to split into groups
    required: true
  target-group-size:
    description: |
      Number of items per group
    required: false
    default: "10"
  result-format:
    description: |
      Output format for groups. Supported: "plain"
    required: false
    default: "plain"
  result-format-plain-separator:
    description: |
      Separator to join items within a group (used when result-format is "plain")
    required: false
    default: " "
  result-item-prefix:
    description: |
      Prefix to prepend to each item
    required: false
    default: ""
```

### Action Outputs

```yaml
outputs:
  matrix:
    description: |
      JSON array of grouped strings
```

## Development

### Global dependencies

- [Taskfile](https://taskfile.dev/installation/)
- [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script)
- [zizmor](https://woodruffw.github.io/zizmor/installation/) - used for GHA security scanning

### Taskfile commands

For all commands see [Taskfile](Taskfile.yaml) or `task --list-all`.

## License

[MIT](LICENSE)
