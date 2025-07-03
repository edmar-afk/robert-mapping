import { useState } from "react";import api from "../assets/api";

function Search({ pins, onResult, activeCategory }) {
	const [query, setQuery] = useState("");
	const [localCategory, setLocalCategory] = useState("");

	const handleSearch = async () => {
		if (!query.trim()) return;

		const category = activeCategory || localCategory;
		if (!category) return;

		let searchData = pins;

		if (!activeCategory) {
			try {
				const response = await api.get(`/api/${category}/`);
				searchData = response.data;
			} catch (error) {
				console.error("Error fetching for search:", error);
				return;
			}
		}

		const result = searchData.find((item) =>
			(item.people || item.name || item.family_name)?.toLowerCase().includes(query.toLowerCase())
		);

		if (result && result.location && result.location.includes(",")) {
			const [latStr, lngStr] = result.location.split(",");
			const lat = parseFloat(latStr);
			const lng = parseFloat(lngStr);

			if (!isNaN(lat) && !isNaN(lng)) {
				let content = "";

				if (result.people && result.age !== undefined && result.gender) {
					content = `
						<b>Found ${category === "pwds" ? "PWD" : "Senior"}:</b><br/>
						Name: ${result.people}<br/>
						Age: ${result.age}<br/>
						Gender: ${result.gender}
					`;
				} else if (result.name && result.type) {
					content = `
						<b>Found Infrastructure:</b><br/>
						Name: ${result.name}<br/>
						Type: ${result.type}<br/>
						Description: ${result.description || "No description"}<br/>
						${result.image ? `<img src="${result.image}" alt="${result.name}" style="width: 100%; margin-top: 5px;" />` : ""}
					`;
				} else if (result.family_name) {
					content = `
						<b>Found Household:</b><br/>
						Family Name: ${result.family_name}<br/>
						Members:<br/>
						<ul style="padding-left: 1rem;">
							${result.members?.map((m) => `<li>${m.name} – ${m.age} yrs – ${m.role}</li>`).join("") || "<li>No members listed</li>"}
						</ul>
					`;
				} else {
					content = "Unknown result.";
				}

				onResult({ lat, lng, data: result, popup: content });
			}
		}
	};

	return (
		<div className="absolute z-[1000] bottom-4 left-1/2 -translate-x-1/2 bg-white p-3 rounded shadow flex flex-col sm:flex-row items-center gap-2">
			<select
				value={localCategory}
				onChange={(e) => setLocalCategory(e.target.value)}
				className="border p-2 rounded w-48"
				disabled={!!activeCategory}>
				<option value="">Select Category</option>
				<option value="pwds">PWDs</option>
				<option value="seniors">Seniors</option>
				<option value="infras">Infrastructures</option>
				<option value="households">Households</option>
			</select>

			<input
				type="text"
				placeholder="Search name..."
				className="border p-2 rounded w-64"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>

			<button
				onClick={handleSearch}
				className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
				Search
			</button>
		</div>
	);
}

export default Search;
