import React, { useEffect } from 'react';
import { connect, styled } from 'frontity';
import PropTypes from 'prop-types';
import { rgba } from 'emotion-rgba';

import Switch from '@frontity/components/switch';

import {
  Header,
  Footer,
  ContactUsModal,
  GlobalStyles,
  theme,
} from 'gfw-components';

import Head from './head';

import { getAPILangCode } from '../helpers/lang';

import Loading from '../pages/loading';
import Home from '../pages/home';
import Tools from '../pages/tools';
import Article from '../pages/article';
import Webinar from '../pages/webinar';
import Archive from '../pages/archive';
import Error from '../pages/error';

import HelpFooter from '../components/footer';

const Theme = ({ state, actions }) => {
  const data = state.source.get(state.router.link);
  const searchOpen = state.theme.searchIsActive;
  const redirectionPost =
    !data.redirection &&
    data.is404 &&
    state.source.post &&
    Object.values(state.source.post)?.[0];

  if (data.isAuthor) {
    data.is404 = true;
  }

  useEffect(() => {
    if (data.redirection) {
      actions.router.set(data.redirection);
    }

    if (redirectionPost) {
      actions.router.set(redirectionPost.link);
    }

    if (state.router.link === '/') {
      actions.router.set('/help');
    }
  }, []);

  useEffect(() => {
    const lang = JSON.parse(localStorage.getItem('txlive:selectedlang'));
    actions.theme.changeLanguage(getAPILangCode(lang));
  }, []);

  const handleLangSelect = (lang) => {
    actions.theme.changeLanguage(getAPILangCode(lang));
    if (data.isPostType && data.isPost) {
      const post = state.source[data.type][data.id];
      const translation = post?.translations_posts?.find((p) =>
        p?.locale?.includes(lang)
      );
      if (translation) {
        actions.router.set(translation.link);
      }
    }
  };

  return (
    <>
      <Head />
      <GlobalStyles />
      <HeaderWrapper>
        <Header
          relative
          pathname="https://www.globalforestwatch.org/help-center"
          openContactUsModal={actions.theme.toggleContactUsModal}
          afterLangSelect={handleLangSelect}
          navMain={[
            { label: 'Map', href: '/map' },
            { label: 'Dashboard', href: '/dashboards/global' },
            {
              label: 'Topics',
              href: '/topics',
              submenu: [
                {
                  label: 'Biodiversity',
                  as: '/topics/biodiversity',
                  href: '/topics/[topic]',
                },
                {
                  label: 'Climate',
                  as: '/topics/climate',
                  href: '/topics/[topic]',
                },
                {
                  label: 'Commodities',
                  as: '/topics/commodities',
                  href: '/topics/[topic]',
                },
                {
                  label: 'Water',
                  as: '/topics/water',
                  href: '/topics/[topic]',
                },
              ],
            },
            { label: 'Blog', extLink: 'https://blog.globalforestwatch.org/' },
            { label: 'About', href: '/about' },
            {
              label: 'Help Center',
              extLink: 'https://www.globalforestwatch.org/help-center',
            },
          ]}
        />
      </HeaderWrapper>
      <Main>
        {searchOpen && (
          <Overlay
            role="button"
            aria-label="close search"
            tabIndex={0}
            onClick={() => actions.theme.setSearchOpen(false)}
          />
        )}
        <Switch>
          <Loading when={data.isFetching} />
          <Home
            when={state.router.link === '/help/' && !data.link.includes('/?s=')}
          />
          <Tools when={data.isTools} />
          <Article when={data.isArticles} />
          <Webinar when={data.isWebinars} />
          <Archive when={data.isSearch || data.isHelpTags} />
          <Error when={data.isError} />
        </Switch>
      </Main>
      {!data.isError && (
        <HelpFooterWrapper>
          <HelpFooter />
        </HelpFooterWrapper>
      )}
      <FooterWrapper>
        <Footer openContactUsModal={actions.theme.toggleContactUsModal} />
      </FooterWrapper>
      <ContactUsModal
        open={state.theme.isContactUsOpen}
        onRequestClose={actions.theme.toggleContactUsModal}
      />
    </>
  );
};

Theme.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
};

export default connect(Theme);

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 100;
  width: 100%;
  margin-bottom: 20px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 76px;
  z-index: 50;
  position: relative;
`;

const FooterWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HelpFooterWrapper = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 100px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba(theme.colors.white, 0.8)};
  cursor: pointer;
  z-index: 10;
`;
