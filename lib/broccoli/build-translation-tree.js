/* eslint-env node */

'use strict';

const fs = require('fs');
const path = require('path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const WatchedDir = require('broccoli-source').WatchedDir;

function buildTranslationTree(project, inputPath, treeGenerator) {
  const projectTranslations = path.join(project.root, inputPath);
  const trees = [];

  processAddons(project.addons, trees, treeGenerator);

  if (fs.existsSync(projectTranslations)) {
    trees.push(new WatchedDir(projectTranslations));
  }

  return funnel(
    mergeTrees(trees, {
      overwrite: true
    }),
    {
      include: ['**/*.yaml', '**/*.yml', '**/*.json']
    }
  );
}

function processAddons(addons, translationTrees, treeGenerator) {
  addons.forEach(addon => _processAddon(addon, translationTrees, treeGenerator));
}

function _processAddon(addon, translationTrees, treeGenerator) {
  const addonTranslationPath = path.join(addon.root, 'translations');
  let addonGeneratedTree;

  if (fs.existsSync(addonTranslationPath)) {
    addonGeneratedTree = treeGenerator(addonTranslationPath);
  }

  if (addon.treeForTranslations) {
    let additionalTranslationTree = addon.treeForTranslations(addonGeneratedTree);

    if (additionalTranslationTree) {
      translationTrees.push(funnel(additionalTranslationTree, { destDir: addon.name }));
    }
  } else if (addonGeneratedTree !== undefined) {
    translationTrees.push(funnel(addonGeneratedTree, { destDir: addon.name }));
  }

  processAddons(addon.addons, translationTrees, treeGenerator);
}

module.exports = buildTranslationTree;
