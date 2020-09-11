import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';

import { convertTool } from 'utils/tools';

import HomePage from 'layouts/home';
import Layout from 'components/layout';
import { getPostsByType } from 'lib/api';
import Head from 'next/head';

export default function Index({ tools }) {

  return (
    <>
      <Layout>
        <Head>
          <title>Global Forest Watch Help Center</title>
        </Head>
        <HomePage tools={tools} />
        {/* <Container>
          <Row>
            <Column width={[1, 5 / 6, 2 / 3]}>
              <Intro
                title={home?.title?.rendered || state.theme.title}
                description={
                  <Html2React html={home?.excerpt?.rendered} /> ||
                  state.theme.description
                }
              />
            </Column>
            <SearchWrapper>
              <Search expanded />
            </SearchWrapper>
          </Row>
          {tools?.map((p) => (
            <div key={p.id}>
              <h2>{p.title?.rendered}</h2>
              <br />
            </div>
          ))}
        </Container> */}
      </Layout>
    </>
  );
}

Index.propTypes = {
  tools: PropTypes.array,
};

export async function getStaticProps() {
  const tools = await getPostsByType({
    type: 'tools',
    params: { per_page: 100 },
  });

  const toolsMapped = tools?.filter(t => !t.parent).map((tool) => ({
    ...convertTool(tool)
  }));

  return {
    props: {
      tools: sortBy(toolsMapped, 'menu_order'),
    },
    revalidate: 10,
  };
}
