import type { ManifestType } from "./schema";

// Example of using ManifestType
// TODO: proper manifest and serving it.
export const manifest: ManifestType = {
  accountAssociation: {
    header:
      "eyJmaWQiOjE2MDg1LCJ0eXBlIjoiY3VzdG9keSIsImtleSI6IjB4OWQxREIyOTkxY2ZiZWZDMDBiQWI0NEZFNkJmMzE5ZjcxQWM2MDBDZSJ9",
    payload: "eyJkb21haW4iOiJmYy1wb2FwLmR0ZWNoLnZpc2lvbiJ9",
    signature:
      "MHg1NmYyZTJiZTkwNWMwYTZjNDdkMGQ4NjYwZjY1MDExZTRkNjYwZDc3OWQzMjU2YmJkMGJkNWU5NWIwZTQzODlmNDY0M2I2Mjk5YWUxZjE4NTg1MjA0OGExNWZiNmZjNzYyYjdjYzJkNWM5ZWMzOGM1NTRiMGVjNTQ4NTg3MTgyZjFj",
  },
  frame: {
    version: "1",
    name: "Farcaster POAP",
    homeUrl: new URL("https://fc-poap.dtech.vision"),
    iconUrl: new URL(
      "https://assets.poap.xyz/5adeb818-235d-4824-9ba5-ffb3e46c4279.png",
    ),
    imageUrl: new URL("https://dtech.vision/tmp/poap.jpg"),
    buttonTitle: "Mint POAP",
  },
};
