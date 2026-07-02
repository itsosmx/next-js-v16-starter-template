import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    globalNotFound: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  async rewrites() {
    return [
      {
        // Web Bot Auth – expose JWKS so receiving sites can verify signed
        // bot/agent requests from this origin (RFC 9421 / WebBotAuth WG).
        source: '/.well-known/http-message-signatures-directory',
        destination: '/api/bot/jwks',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./locales/en.json"
  },
});

export default withNextIntl(nextConfig);