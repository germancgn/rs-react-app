import type { EmissionDataResponse, EntityEmissions } from '../types/emissions';

// const API_URL =
//   'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

// Data stored in the project for easier cross-check
const API_URL = '/data/owid-co2-data.json';

export async function fetchEmissions(): Promise<EntityEmissions[]> {
  const response = await fetch(API_URL);
  //   await new Promise((resolve) => setTimeout(resolve, 100_000));
  if (!response.ok) {
    throw new Error(
      `Failed to fetch emissions data: ${response.status} ${response.statusText}`
    );
  }
  const json = (await response.json()) as EmissionDataResponse;
  // TODO Move data mapping to DataContainer
  return Object.entries(json).map(([key, keyData]) => {
    return {
      name: key,
      ...keyData,
    };
  });
}
