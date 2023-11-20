const { getInfo } = require('@changesets/get-github-info');

const repo = 'ember-intl/ember-intl';

async function extractInformation(changeset) {
  const { links: info } = await getInfo({
    commit: changeset.commit,
    repo,
  });

  const contributor = info.user ? `(${info.user})` : undefined;
  const link = info.pull ?? info.commit ?? undefined;
  const summary = (changeset.summary ?? '').split('\n')[0].trim();

  return {
    contributor,
    link,
    summary,
  };
}

function getDependencyReleaseLine() {
  return '';
}

async function getReleaseLine(changeset) {
  try {
    const { contributor, link, summary } = await extractInformation(changeset);

    const line = [link, summary, contributor].filter(Boolean).join(' ');

    return `- ${line}`;
  } catch (error) {
    console.error(`ERROR: getReleaseLine (${error.message})`);

    return '';
  }
}

module.exports = {
  getDependencyReleaseLine,
  getReleaseLine,
};
