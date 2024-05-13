declare const manifest: {
  bundles: Record<
    string,
    | undefined
    | {
        assets: { type: string; uri: string }[];
      }
  >;
};

export default manifest;
