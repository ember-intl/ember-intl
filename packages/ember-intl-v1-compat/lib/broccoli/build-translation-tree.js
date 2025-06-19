const { existsSync } = require('node:fs');
const { join } = require('node:path');
const funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const { WatchedDir } = require('broccoli-source');

function funnelTranslations(tree, destDir) {
  if (!tree) {
    return;
  }

  return funnel(tree, {
    destDir: destDir || '.',
    include: ['**/*.yaml', '**/*.yml', '**/*.json'],
  });
}

function processAddons(addons, options) {
  addons.forEach((addon) => {
    const { addonsWithTranslations, translationTrees, treeGenerator } = options;

    const addonTranslationPath = join(addon.root, 'translations');
    let addonGeneratedTree;

    if (existsSync(addonTranslationPath)) {
      addonGeneratedTree = treeGenerator.call(addon, addonTranslationPath);
    }

    if (addon.treeForTranslations) {
      const additionalTranslationTree =
        addon.treeForTranslations(addonGeneratedTree);

      if (additionalTranslationTree) {
        addonsWithTranslations.push(addon.name);

        translationTrees.push(
          funnel(additionalTranslationTree, {
            destDir: addon.name,
          }),
        );
      }
    } else if (addonGeneratedTree !== undefined) {
      addonsWithTranslations.push(addon.name);

      translationTrees.push(
        funnel(addonGeneratedTree, {
          destDir: addon.name,
        }),
      );
    }

    processAddons(addon.addons, {
      addonsWithTranslations,
      translationTrees,
      treeGenerator,
    });
  });
}

function buildTranslationTree(project, inputPath, treeGenerator) {
  const addonsWithTranslations = [];
  const translationTrees = [];
  const trees = [];

  processAddons(project.addons, {
    addonsWithTranslations,
    translationTrees,
    treeGenerator,
  });

  if (translationTrees.length > 0) {
    trees.push(
      funnelTranslations(
        mergeTrees(translationTrees, { overwrite: true }),
        '__ember-intl-addon__',
      ),
    );
  }

  const projectTranslations = join(project.root, inputPath);

  if (existsSync(projectTranslations)) {
    trees.push(new WatchedDir(projectTranslations));
  }

  return [mergeTrees(trees, { overwrite: true }), addonsWithTranslations];
}

module.exports = buildTranslationTree;
