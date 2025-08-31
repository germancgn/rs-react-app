## Performance Profiling

### Scenarios

1. Sort a column (name)
2. Search for a country "Germany"
3. Change year (2020)
4. Remove column (ISO)
5. Add column (ISO)

### Results before optimization

| Scenario         | Render (ms) | Caused update         |
| ---------------- | ----------- | --------------------- |
| Sort (name)      | 38.2ms      | Table                 |
| Search "Germany" | 46.2ms      | EmissionDataContainer |
| Change year      | 22.8ms      | Dropdown              |
| Remove column    | 22.7ms      | Dropdown              |
| Add column       | 28.1ms      | Dropdown              |

- **Sort Flamegraph:** ![Screenshot](./screenshots/Sort-Flamegraph.png)
- **Sort Ranked:** ![Screenshot](./screenshots/Sort-Ranked.png)
- **Search Flamegraph:** ![Screenshot](./screenshots/Search-Flamegraph.png)
- **Search Ranked:** ![Screenshot](./screenshots/Search-Ranked.png)
- **Change year Flamegraph:**
  ![Screenshot](./screenshots/YearSelection-Flamegraph.png)
- **Change year Ranked:** ![Screenshot](./screenshots/YearSelection-Ranked.png)
- **Add column Flamegraph:**
  ![Screenshot](./screenshots/AddColumn-Flamegraph.png)
- **Add column Ranked:** ![Screenshot](./screenshots/AddColumn-Ranked.png)
- **Remove column Flamegraph:**
  ![Screenshot](./screenshots/RemoveColumn-Flamegraph.png)
- **Remove column Ranked:** ![Screenshot](./screenshots/RemoveColumn-Ranked.png)

### Results after optimization

| Scenario         | Render (ms) | Caused update         |
| ---------------- | ----------- | --------------------- |
| Sort (name)      | 39.6ms      | Table                 |
| Search "Germany" | 13.1ms      | EmissionDataContainer |
| Change year      | 22.6ms      | Dropdown              |
| Remove column    | 22.8ms      | Dropdown              |
| Add column       | 58.7ms      | Dropdown              |

- **Sort Flamegraph:**
  ![Screenshot](./screenshots/after-optimization/sort-flamegraph.png)
- **Sort Ranked:**
  ![Screenshot](./screenshots/after-optimization/sort-ranked.png)
- **Search Flamegraph:**
  ![Screenshot](./screenshots/after-optimization/search-flamegraph.png)
- **Search Ranked:**
  ![Screenshot](./screenshots/after-optimization/search-ranked.png)
- **Change year Flamegraph:**
  ![Screenshot](./screenshots/after-optimization/year-selection-flamegraph.png)
- **Change year Ranked:**
  ![Screenshot](./screenshots/after-optimization/year-selection-ranked.png)
- **Add column Flamegraph:**
  ![Screenshot](./screenshots/after-optimization/add-column-flamegraph.png)
- **Add column Ranked:**
  ![Screenshot](./screenshots/after-optimization/add-column-ranked.png)
- **Remove column Flamegraph:**
  ![Screenshot](./screenshots/after-optimization/remove-column-flamegraph.png)
- **Remove column Ranked:**
  ![Screenshot](./screenshots/after-optimization/remove-column-ranked.png)
