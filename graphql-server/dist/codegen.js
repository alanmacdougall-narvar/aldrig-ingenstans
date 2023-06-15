const config = {
    overwrite: true,
    schema: "src/schema.graphql",
    generates: {
        "src/generated/graphql.ts": {
            plugins: ["typescript", "typescript-resolvers"]
        }
    }
};
export default config;
