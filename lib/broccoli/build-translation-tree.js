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
  const addonNames = [];

  processAddons(project.addons, addonNames, trees, treeGenerator);

  if (fs.existsSync(projectTranslations)) {
    trees.push(new WatchedDir(projectTranslations));
  }

  return [
    funnel(
      mergeTrees(trees, {
        overwrite: true
      }),
      {
        include: ['**/*.yaml', '**/*.yml', '**/*.json']
      }
    ),

    addonNames
  ];
}

function processAddons(addons, addonNames, translationTrees, treeGenerator) {
  addons.forEach(addon => _processAddon(addon, addonNames, translationTrees, treeGenerator));
}

function _processAddon(addon, addonNames, translationTrees, treeGenerator) {
  const addonTranslationPath = path.join(addon.root, 'translations');
  let addonGeneratedTree;

  if (fs.existsSync(addonTranslationPath)) {
    addonGeneratedTree = treeGenerator.call(addon, addonTranslationPath);
  }

  if (addon.treeForTranslations) {
    let additionalTranslationTree = addon.treeForTranslations(addonGeneratedTree);

    if (additionalTranslationTree) {
      addonNames.push(addon.name)
      translationTrees.push(funnel(additionalTranslationTree, { destDir: addon.name }));
    }
  } else if (addonGeneratedTree !== undefined) {
    addonNames.push(addon.name)
    translationTrees.push(funnel(addonGeneratedTree, { destDir: addon.name }));
  }

  processAddons(addon.addons, addonNames, translationTrees, treeGenerator);
}

module.exports = buildTranslationTree;
