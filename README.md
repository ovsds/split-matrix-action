# Split Matrix Action

[![CI](https://github.com/ovsds/split-matrix-action/workflows/Check%20PR/badge.svg)](https://github.com/ovsds/split-matrix-action/actions?query=workflow%3A%22%22Check+PR%22%22)
[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Split%20Matrix-blue.svg)](https://github.com/marketplace/actions/split-matrix)

Split Matrix Action

## Usage

### Example

```yaml
jobs:
  split-matrix:
    steps:
      - name: Split Matrix
        id: split-matrix
        uses: ovsds/split-matrix-action@v1
```

### Action Inputs

```yaml
inputs:
  placeholder:
    description: |
      Placeholder input to be replaced by real inputs
    required: true
    default: "placeholder"
```

### Action Outputs

```yaml
outputs:
  placeholder:
    description: |
      Placeholder output to be replaced by real outputs
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
