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
| Sort (name)      | -           | Table                 |
| Search "Germany" | -           | EmissionDataContainer |
| Change year      | —           | Dropdown              |
| Remove column    | —           | Dropdown              |
| Add column       | —           | Dropdown              |
