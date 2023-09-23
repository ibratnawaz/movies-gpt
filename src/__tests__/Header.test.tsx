import { expect, describe, it, beforeEach, afterEach } from 'vitest';
import { RenderResult, render } from '@testing-library/react';
import Header from '@/components/Header';
import { StaticRouter } from 'react-router-dom/server';

describe('Testing Header Component', () => {
  let header: RenderResult;

  beforeEach(() => {
    header = render(
      <StaticRouter location="/">
        <Header />
      </StaticRouter>
    );
  });

  afterEach(() => {
    header.unmount();
  });

  it('should render', async () => {
    const appLogo = header.getByTestId('appLogo') as HTMLImageElement;
    expect(appLogo.src).toContain('app-logo.png');
  });

  it('should render singIn text', async () => {
    const appLogo = header.getByTestId('signInText') as HTMLSpanElement;
    expect(appLogo.textContent).toContain('Sign In');
  });
});
