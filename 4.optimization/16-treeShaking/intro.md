# remove codes that have not been used for less size

- just need two configs:

  1. use es6 module
  2. at production mode

- Note:
  it might remove some sideeffect(like css) files
  so we need to add a config at packsge.json:
  "sideEffects": ["*.css", "*.less"]
