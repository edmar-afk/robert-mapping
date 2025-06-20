import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import api from "../../assets/api";

function PwdCharts() {
	const [, setData] = useState([]);
	const [ageCounts, setAgeCounts] = useState([0, 0, 0, 0]);
	const [genderCounts, setGenderCounts] = useState({ Male: 0, Female: 0 });

	useEffect(() => {
		const fetchPwds = async () => {
			try {
				const response = await api.get(`/api/pwds/`);
				const fetchedData = response.data;
				setData(fetchedData);

				const ageGroupCounts = [0, 0, 0, 0];
				const genderGroupCounts = { Male: 0, Female: 0 };

				fetchedData.forEach((person) => {
					const age = parseInt(person.age);
					const gender = person.gender;

					if (!isNaN(age)) {
						if (age >= 1 && age <= 30) ageGroupCounts[0]++;
						else if (age >= 31 && age <= 60) ageGroupCounts[1]++;
						else if (age >= 61 && age <= 90) ageGroupCounts[2]++;
						else if (age >= 91) ageGroupCounts[3]++;
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

		fetchPwds();
	}, []);

	const ageOptions = {
		chart: {
			type: "bar",
			height: 350,
		},
		xaxis: {
			categories: ["1–30", "31–60", "61–90", "91+"],
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
					Lists of PWDS in Brgy Matin-ao Bayog Zamboanga del Sur.
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

export default PwdCharts;
