/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from '@/components/Header';
import { userInfoAtom } from '@/store/global.atom.store';
import { RenderResult, render } from '@testing-library/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { type ReactElement } from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { afterEach, describe, expect, it } from 'vitest';

const HydrateAtoms = (props: { initialValues: any; children: ReactElement }) => {
  useHydrateAtoms(props.initialValues);
  return props.children;
};

const TestProvider = (props: { initialValues: any; children: ReactElement }) => (
  <Provider>
    <HydrateAtoms initialValues={props.initialValues}>{props.children}</HydrateAtoms>
  </Provider>
);

const HeaderProvider = (props: { isLoggedIn: boolean }) => {
  return (
    <TestProvider initialValues={[[userInfoAtom, props.isLoggedIn]]}>
      <Header />
    </TestProvider>
  );
};

describe('Testing Header Component', () => {
  let header: RenderResult;

  afterEach(() => {
    header.unmount();
  });

  it('should render', async () => {
    header = render(
      <StaticRouter location="/">
        <Header />
      </StaticRouter>
    );
    const appLogo = header.getByTestId('appLogo') as HTMLImageElement;
    expect(appLogo.src).toContain('app-logo.png');
  });

  it('should render singIn text', async () => {
    header = render(
      <StaticRouter location="/">
        <Header />
      </StaticRouter>
    );
    const sigin = header.getByTestId('signInText') as HTMLSpanElement;
    expect(sigin.textContent).toContain('Sign In');
  });

  it('should render singOut text', async () => {
    header = render(
      <StaticRouter location="/">
        <HeaderProvider isLoggedIn={true} />
      </StaticRouter>
    );
    const signOut = header.getByTestId('signOutText') as HTMLSpanElement;
    expect(signOut.textContent).toContain('Sign Out');
  });
});
