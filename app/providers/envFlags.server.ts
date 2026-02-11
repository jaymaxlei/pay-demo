import * as z from "zod";

export const serverEnvSchema = z.object({
  IDOS_CONSUMER_SIGNER: z.string(),
  IDOS_RECIPIENT_ENC_PRIVATE_KEY: z.string(),
  NOAH_API_URL: z.string(),
  NOAH_API_KEY: z.string(),
  NOAH_PRIVATE_KEY: z.string(),
  KRAKEN_API_URL: z.string(),
  KRAKEN_CLIENT_ID: z.string(),
  KRAKEN_ISSUER: z.string(),
  KRAKEN_PRIVATE_KEY: z.string(),
  KRAKEN_PUBLIC_KEY_MULTIBASE: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  SECRET_KEY_BASE: z.string(),
  SECURE_AUTH_COOKIE: z.enum(["true", "false"]).transform((v) => v === "true"),
  HIFI_API_URL: z.string(),
  HIFI_API_KEY: z.string(),
  FILES_PRIVATE_KEY: z.string(),
  FILES_PUBLIC_KEY: z.string(),
  MONERIUM_API_URL: z.string(),
  MONERIUM_CLIENT_ID: z.string(),
  MONERIUM_CLIENT_SECRET: z.string(),
  MONERIUM_AUTH_CODE_FLOW: z.string(),
  MONERIUM_FORCE_BACK_URL: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Zod will filter all the keys not specified on the schema */
function buildEnv(): ServerEnv {
  try {
    return serverEnvSchema.parse(process.env);
  } catch (error: unknown) {
    console.error("Warning: invalid server env vars! Using DUMMY defaults for demo.");
    // console.error(error);

    // Return a full dummy object that satisfies the schema
    return {
      IDOS_CONSUMER_SIGNER: "dummy-signer",
      IDOS_RECIPIENT_ENC_PRIVATE_KEY: "dummy-key",
      NOAH_API_URL: "https://api.noah.com",
      NOAH_API_KEY: "dummy-noah-key",
      NOAH_PRIVATE_KEY: "dummy-noah-private",
      KRAKEN_API_URL: "https://api.kraken.com",
      KRAKEN_CLIENT_ID: "dummy-kraken-id",
      KRAKEN_ISSUER: "dummy-issuer",
      KRAKEN_PRIVATE_KEY: "dummy-kraken-private",
      KRAKEN_PUBLIC_KEY_MULTIBASE: "dummy-multibase",
      NODE_ENV: "development",
      SECRET_KEY_BASE: "dummy-secret-key-must-be-long-enough-for-security-purposes",
      SECURE_AUTH_COOKIE: false,
      HIFI_API_URL: "https://api.hifi.com",
      HIFI_API_KEY: "dummy-hifi-key",
      FILES_PRIVATE_KEY: "dummy-files-private",
      FILES_PUBLIC_KEY: "dummy-files-public",
      MONERIUM_API_URL: "https://api.monerium.com",
      MONERIUM_CLIENT_ID: "dummy-monerium-id",
      MONERIUM_CLIENT_SECRET: "dummy-monerium-secret",
      MONERIUM_AUTH_CODE_FLOW: "dummy-flow",
    };
  }
}

export const SERVER_ENV = buildEnv();
