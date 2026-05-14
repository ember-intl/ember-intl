import type { TargetVersion } from '../../types/index.js';

type PackageVersion = string;
type PackageVersions = [number, number, number];

function parse(
  version: PackageVersion | undefined,
): PackageVersions | undefined {
  if (version === undefined) {
    return;
  }

  const regex = new RegExp(/^(\^|~)?(\d+(\.\d+)?(\.\d+)?).*/);
  const matches = version.match(regex);

  if (!matches) {
    return;
  }

  const [majorVersion, minorVersion, patchVersion] = matches[2]!.split('.') as [
    string,
    string,
    string,
  ];

  return [
    Number(majorVersion),
    Number(minorVersion ?? 0),
    Number(patchVersion ?? 0),
  ];
}

export function getTargetVersion(
  currentVersion: PackageVersion | undefined,
): TargetVersion | undefined {
  const packageVersions = parse(currentVersion);

  if (packageVersions === undefined) {
    return undefined;
  }

  switch (packageVersions[0]) {
    case 6: {
      return 7;
    }

    case 7: {
      return 8;
    }

    default: {
      return undefined;
    }
  }
}
