const fs = require('fs');
const path = require('path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const WatchedDir = require('broccoli-source').WatchedDir;

const enums = require('./enums');

function funnelTranslations(tree, destDir) {
  if (!tree) {
    return;
  }

  return funnel(tree, {
    destDir: destDir || '.',
    include: ['**/*.yaml', '**/*.yml', '**/*.json'],
  });
}

function buildTranslationTree(project, inputPath, treeGenerator) {
  const projectTranslations = path.join(project.root, inputPath);
  const addonTrees = [];
  const addonsWithTranslations = [];
  const trees = [];

  processAddons(
    project.addons,
    addonsWithTranslations,
    addonTrees,
    treeGenerator,
  );

  if (addonTrees.length > 0) {
    trees.push(
      funnelTranslations(
        mergeTrees(addonTrees, { overwrite: true }),
        enums.addonNamespace,
      ),
    );
  }

  if (fs.existsSync(projectTranslations)) {
    trees.push(new WatchedDir(projectTranslations));
  }

  return [mergeTrees(trees, { overwrite: true }), addonsWithTranslations];
}

function processAddons(
  addons,
  addonsWithTranslations,
  translationTrees,
  treeGenerator,
) {
  addons.forEach((addon) =>
    _processAddon(
      addon,
      addonsWithTranslations,
      translationTrees,
      treeGenerator,
    ),
  );
}

function _processAddon(
  addon,
  addonsWithTranslations,
  translationTrees,
  treeGenerator,
) {
  const addonTranslationPath = path.join(addon.root, 'translations');
  let addonGeneratedTree;

  if (fs.existsSync(addonTranslationPath)) {
    addonGeneratedTree = treeGenerator.call(addon, addonTranslationPath);
  }

  if (addon.treeForTranslations) {
    let additionalTranslationTree =
      addon.treeForTranslations(addonGeneratedTree);

    if (additionalTranslationTree) {
      addonsWithTranslations.push(addon.name);
      translationTrees.push(
        funnel(additionalTranslationTree, { destDir: addon.name }),
      );
    }
  } else if (addonGeneratedTree !== undefined) {
    addonsWithTranslations.push(addon.name);
    translationTrees.push(funnel(addonGeneratedTree, { destDir: addon.name }));
  }

  processAddons(
    addon.addons,
    addonsWithTranslations,
    translationTrees,
    treeGenerator,
  );
}

module.exports = buildTranslationTree;
