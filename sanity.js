import { createClient } from "next-sanity";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ggf5rvfc"; // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET; // "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION; // "2022-11-16"

export const config = {
  dataset,
  projectId,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};
export const sanityClient = createClient(config);
