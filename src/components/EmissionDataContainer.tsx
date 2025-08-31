import { useState, useEffect, use, useMemo, useCallback } from 'react';
import { fetchEmissions } from '../services/emissionsService';
import type { EntityEmissions, EmissionRecord } from '../types/emissions';
import { Check, MafnifyingGlass, SlidersHorizontal } from './Icon';
import Table from './Table';
import Dropdown from './Dropdown';

type SortableKey = keyof EmissionRecord | 'name' | 'iso_code';
type ViewMode = 'countries' | 'regions';
type Header = {
  key: SortableKey;
  displayName: string;
  selectable: boolean;
  selected: boolean;
  format: boolean;
};
type FlattenedData = EmissionRecord & Omit<EntityEmissions, 'data'>;

const DEFAULT_HEADERS: Header[] = [
  {
    key: 'name',
    displayName: 'Country',
    selectable: false,
    selected: true,
    format: false,
  },
  {
    key: 'iso_code',
    displayName: 'ISO',
    selectable: true,
    selected: true,
    format: false,
  },
  {
    key: 'year',
    displayName: 'Year',
    selectable: true,
    selected: true,
    format: false,
  },
  {
    key: 'population',
    displayName: 'Population',
    selectable: true,
    selected: true,
    format: true,
  },
  {
    key: 'co2',
    displayName: 'co2',
    selectable: true,
    selected: true,
    format: true,
  },
  {
    key: 'co2_per_capita',
    displayName: 'co2 per Capita',
    selectable: true,
    selected: true,
    format: true,
  },
  {
    key: 'methane',
    displayName: 'Methane',
    selectable: true,
    selected: false,
    format: true,
  },
  {
    key: 'methane_per_capita',
    displayName: 'Methane per Capita',
    selectable: true,
    selected: false,
    format: true,
  },
  {
    key: 'gas_co2',
    displayName: 'Gas co2',
    selectable: true,
    selected: false,
    format: true,
  },
  {
    key: 'gas_co2_per_capita',
    displayName: 'Gas co2 per Capita',
    selectable: true,
    selected: false,
    format: true,
  },
  {
    key: 'gdp',
    displayName: 'GDP',
    selectable: true,
    selected: false,
    format: true,
  },
];

const emissionsData = fetchEmissions();

export default function EmissionDataContainer() {
  const data = use<EntityEmissions[]>(emissionsData);
  const [year, setYear] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [headers, setHeaders] = useState<Header[]>([...DEFAULT_HEADERS]);
  const [view, setView] = useState<ViewMode>('countries');
  const [selectedCountryName, setSelectedCountryName] = useState<string>('');

  const years = useMemo<number[]>(() => {
    return [
      ...data.reduce((acc, curr) => {
        curr.data.forEach((data) => {
          if (Number.isFinite(data.year)) {
            acc.add(data.year);
          }
        });
        return acc;
      }, new Set<number>()),
    ].sort((a, b) => b - a);
  }, [data]);

  const mapped = useMemo<FlattenedData[]>(() => {
    return data.map(({ name, iso_code, data }) => ({
      name,
      iso_code,
      ...data.find((r) => r.year === year),
    })) as FlattenedData[];
  }, [data, year]);

  const filtered = useMemo<FlattenedData[]>(() => {
    return mapped
      .filter(({ iso_code }) => {
        return view === 'countries' ? !!iso_code : !iso_code;
      })
      .filter(({ name }) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [mapped, view, searchTerm]);

  useEffect(() => {
    setYear(years[0]);
  }, [years]);

  const handleViewChange = useCallback((viewMode: ViewMode) => {
    setView(() => viewMode);
    setSelectedCountryName('');
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setSelectedCountryName('');
    },
    []
  );

  const handleYearChange = useCallback((year: number) => {
    setYear(year);
    setSelectedCountryName('');
  }, []);

  const handleHeaderToggle = useCallback((key: string) => {
    setHeaders((prev) =>
      prev.map((header) =>
        header.selectable
          ? header.key === key
            ? { ...header, selected: !header.selected }
            : header
          : header
      )
    );
  }, []);

  const handleRowSelect = useCallback(
    (row: FlattenedData) => setSelectedCountryName(row.name as string),
    []
  );

  const getRowKey = useCallback(
    (row: FlattenedData) => row.name + String(row.year),
    []
  );

  const selectedCountryData = useMemo<EntityEmissions | undefined>(() => {
    if (selectedCountryName) {
      return data.find((row) => row.name === selectedCountryName);
    }
  }, [data, selectedCountryName]);

  return (
    <>
      <h1 className="text-4xl font-bold text-white mt-4 mb-4">
        CO2 emissions data{' '}
        {selectedCountryData ? ` for ${selectedCountryData.name}` : ''}
      </h1>
      <div className="flex mb-4">
        <div className="flex rounded-full gap-4 p-1 items-center justify-between w-full">
          <div className="flex items-center gap-4 rounded-full bg-gray-700 focus-within:bg-gray-600 p-1 transition-all">
            <span className="text-gray-200 pl-4">
              <MafnifyingGlass size={18} />
            </span>
            <input
              type="search"
              value={searchTerm}
              placeholder={`Search ${view}`}
              onChange={handleInputChange}
              className="text-gray-200 outline-0"
            />
            <button className="text-gray-200 bg-blue-500 py-1.5 px-8 rounded-full cursor-pointer">
              Search
            </button>
          </div>

          <div className="flex gap-4">
            <Dropdown
              closeOnSelect={false}
              className="flex relative text-gray-200 self-center hover:bg-gray-700 rounded-full cursor-pointer transition-all"
              button={
                <button className="text-gray-200 p-2 cursor-pointer">
                  <SlidersHorizontal size={20} />
                </button>
              }
            >
              {
                <>
                  {headers.map(({ key, displayName, selected, selectable }) => (
                    <li
                      className="flex gap-8 items-center justify-between cursor-pointer whitespace-nowrap hover:bg-gray-600 p-2 rounded-md transition-all group"
                      key={key}
                      onClick={() => handleHeaderToggle(key)}
                    >
                      <span className="text-gray-400 group-hover:text-gray-200 select-none">
                        {displayName}
                      </span>
                      <button
                        key={key}
                        className={`check-button ${selected ? 'checked' : ''} ${
                          selectable ? '' : 'disabled'
                        }`}
                        type="button"
                      >
                        {selected ? <Check size={16} /> : ''}
                      </button>
                    </li>
                  ))}
                </>
              }
            </Dropdown>

            <div className="relative flex items-center bg-gray-800 focus-within:bg-gray-600 p-1 rounded-full">
              <div className="text-gray-200 px-4">Year</div>
              <Dropdown
                closeOnSelect={true}
                className=""
                button={
                  <button
                    className="ml-4 px-4 py-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-200 cursor-pointer transition-all"
                    type="button"
                  >
                    {year}
                  </button>
                }
              >
                <>
                  {years.map((year) => (
                    <li>
                      <button
                        key={year}
                        className="w-full hover:bg-gray-600 text-gray-400 hover:text-gray-200 px-4 py-2 text-left cursor-pointer rounded-md transition-all"
                        onClick={() => handleYearChange(year)}
                        type="button"
                      >
                        {year}
                      </button>
                    </li>
                  ))}
                </>
              </Dropdown>
            </div>
            <div className="flex items-center gap-2 bg-gray-800 p-1 rounded-full">
              <button
                onClick={() => handleViewChange('countries')}
                className={`flex ${
                  view === 'countries' ? 'bg-blue-500' : 'hover:bg-gray-700'
                } rounded-full text-gray-300 py-1.5 px-8 cursor-pointer transition-colors duration-200`}
              >
                Countries
              </button>
              <button
                onClick={() => handleViewChange('regions')}
                className={`flex ${
                  view === 'regions' ? 'bg-blue-500' : 'hover:bg-gray-700'
                } rounded-full text-gray-300 py-1.5 px-8 cursor-pointer transition-colors duration-200`}
              >
                Regions
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {selectedCountryData ? (
          <div>
            <div className="text-gray-200 flex gap-2 my-4 items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-200">
                {selectedCountryData.name}{' '}
                {selectedCountryData.iso_code
                  ? `(${selectedCountryData.iso_code})`
                  : ''}
              </h3>
              <button
                onClick={() => setSelectedCountryName('')}
                className="close-details-button bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-300 text-sm transition-all px-4 py-2 rounded-full cursor-pointer"
              >
                Close details
              </button>
            </div>
            <Table
              headers={headers
                .filter(({ selected }) => selected)
                .filter(({ key }) => key !== 'iso_code' && key !== 'name')}
              rows={selectedCountryData.data
                .map((data) => ({
                  ...data,
                  name: selectedCountryData.name,
                  iso_code: selectedCountryData.iso_code,
                }))
                .sort((a, b) => b.year - a.year)}
              keyForRow={(row) => {
                console.log({
                  selectedCountry: selectedCountryName,
                  name: row.name,
                  year: row.year,
                });

                return selectedCountryName + row.year;
              }}
            />
          </div>
        ) : (
          filtered && (
            <Table
              headers={headers.filter(({ selected }) => selected)}
              rows={filtered}
              keyForRow={getRowKey}
              onRowSelect={handleRowSelect}
            />
          )
        )}
      </div>
    </>
  );
}
