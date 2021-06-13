# webpack performance optimization

- development mode
- production mode

## development mode

- optimize the bundling speed
  - HMR
- optimize the code debug
  - source-map

## production mode

- optimize the bundling speed
  - oneOf :[...loader]
  - babel cache
  - multiple processes bundling
  - externals
  - dll
- optimize running performance of the code after online
  - cache: (hash; chunkhash; contenthash)
  - tree shaking
  - code split
  - lazy loading && preloading
  - PWA
