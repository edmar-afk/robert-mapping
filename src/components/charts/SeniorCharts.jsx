import { useState, useEffect } from "react";import Chart from "react-apexcharts";
import api from "../../assets/api";

function SeniorCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchSeniors = async () => {
			try {
				const response = await api.get(`/api/seniors/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 50 && age <= 70) ageGroupCounts[0]++;
						else if (age >= 71 && age <= 90) ageGroupCounts[1]++;
						else if (age >= 91 && age <= 99) ageGroupCounts[2]++;
						else if (age >= 100) ageGroupCounts[3]++;
					}

					if (gender === "Male" || gender === "Female") {
						genderGroupCounts[gender]++;
					}
				});

				setAgeCounts(ageGroupCounts);
				setGenderCounts(genderGroupCounts);
			} catch (error) {
				console.error("Error fetching data:", error);
				setData([]);
				setAgeCounts([0, 0, 0, 0]);
				setGenderCounts({ Male: 0, Female: 0 });
			}
		};

		fetchSeniors();
	}, []);

	const ageOptions = {
		chart: {
			type: "bar",
			height: 350,
		},
		xaxis: {
			categories: ["50–70", "71–90", "91–99", "100+"],
		},
		dataLabels: {
			enabled: true,
		},
	};

	const genderOptions = {
		chart: {
			type: "line",
			height: 350,
			zoom: {
				enabled: false,
			},
		},
		xaxis: {
			categories: ["Male", "Female"],
		},
		dataLabels: {
			enabled: true,
		},
		stroke: {
			curve: "smooth",
		},
		colors: ["#008FFB"],
	};

	return (
		<>
			<div>
				<p className="my-12 text-center text-lg font-semibold">
					Lists of Seniors in Brgy Matin-ao Bayog Zamboanga del Sur.
				</p>
				<Chart
					options={ageOptions}
					series={[{ name: "PWD Count", data: ageCounts }]}
					type="bar"
					height={350}
				/>
				<p className="text-center -mt-4 mb-24 text-sm">By Age</p>
			</div>

			<div>
				<Chart
					options={genderOptions}
					series={[{ name: "PWD Count", data: [genderCounts.Male, genderCounts.Female] }]}
					type="line"
					height={350}
				/>
				<p className="text-center -mt-4 mb-8 text-sm">By Gender</p>
			</div>
		</>
	);
}

export default SeniorCharts;
