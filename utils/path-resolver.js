const FEATURE_ENV = process.env.NEXT_PUBLIC_FEATURE_ENV;
// eslint-disable-next-line import/prefer-default-export
export const appBasePath = () => {
  if (FEATURE_ENV === 'staging') {
    return 'https://staging.globalforestwatch.org';
  }

  if (FEATURE_ENV === 'local') {
    return 'http://localhost:3000';
  }

  return 'https://globalforestwatch.org';
};
