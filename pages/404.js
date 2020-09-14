import ErrorPage from 'layouts/error';
import Layout from 'layouts/layout';

export default function Custom404() {
  return (
    <Layout noIndex>
      <ErrorPage statusCode={404} />
    </Layout>
  );
}
