export type EmissionDataResponse = {
  [entityName: string]: {
    iso_code?: string;
    data: EmissionRecord[];
  };
};

export type EmissionRecord = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  cement_co2?: number;
  coal_co2?: number;
  coal_co2_per_capita?: number;
  methane?: number;
  methane_per_capita?: number;
  gas_co2?: number;
  gas_co2_per_capita?: number;
  gdp?: number;
};

export type EntityEmissions = {
  name: string;
  iso_code?: string;
  data: EmissionRecord[];
};
