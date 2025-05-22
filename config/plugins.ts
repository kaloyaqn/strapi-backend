import { env } from "@strapi/utils";

export default () => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_USER"),
          pass: env("SMTP_PASS"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env("SMTP_DEFAULT_FROM"),
        defaultReplyTo: env("SMTP_DEFAULT_REPLYTO"),
      },
    },
  },
  "strapi-algolia": {
    enabled: true,
    config: {
      apiKey: env("ALGOLIA_ADMIN_KEY"),
      applicationId: env("ALGOLIA_APP_ID"),
      contentTypes: [
        { name: "api::article.article" },
        // ...
      ],
    },
  },
  graphql: {
    config: {
      playgroundAlways: true,
    },
  },
});
