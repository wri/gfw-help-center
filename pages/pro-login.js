import dynamic from 'next/dynamic';

import ProLogin from 'components/pro-login';

const Layout = dynamic(() => import('layouts/layout'), {
  ssr: false,
});

export default function Login() {
  return (
    <Layout>
      <ProLogin independent />
    </Layout>
  );
}
