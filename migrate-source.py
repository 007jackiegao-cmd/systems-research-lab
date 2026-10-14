from pathlib import Path

for filename in ['CONTENT_INVENTORY.md', 'ENGINEERING_PROJECT.md', 'MISSION_PROJECT.md', 'PORTFOLIO_GUIDE.md', 'PROJECTS.md', 'QUANT_ARCHITECTURE.md', 'QUANT_METHODOLOGY.md', 'QUANT_PROJECT.md', 'QUANT_VALIDATION.md', 'SCENARIO_ARCHITECTURE.md', 'SCENARIO_METHODOLOGY.md', 'SCENARIO_PROJECT.md', 'SCENARIO_VALIDATION.md', 'VALIDATION.md', 'example_results.json', 'leaflet.css', 'leaflet.js', 'topojson-client.js']:
    Path(filename).unlink(missing_ok=True)
Path(__file__).unlink()
