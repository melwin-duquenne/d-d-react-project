import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      MONGODB_URI: process.env.MONGODB_URI,
      ENV_MAIL_TEST: process.env.ENV_MAIL_TEST,
      ENV_MDP_TEST: process.env.ENV_MDP_TEST,
    },
  },
});
