import { useState, useEffect } from "react";import api from "../../assets/api";

function InfrasChart() {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchInfras = async () => {
			try {
				const response = await api.get(`/api/infras/`);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching infrastructures:", error);
				setData([]);
			}
		};

		fetchInfras();
	}, []);

	const defaultImage = "https://images.unsplash.com/photo-1499856871958-5b9627545d1a";

	return (
		<>
			<p className="text-center text-lg font-semibold my-12">
				Infrastructure Around Brgy Matin-ao Bayog Zamboanga del Sur
			</p>

			<div className="flex flex-col justify-center">
				{data.map((infra, index) => (
					<article
						key={index}
						className="relative isolate mb-4 flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 shadow-lg">
						<img
							src={infra.image ? infra.image : defaultImage}
							alt={infra.name}
							className="absolute inset-0 h-full w-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
						<h3 className="z-10 mt-3 text-2xl font-bold text-white">{infra.name}</h3>
						<div className="z-10 text-sm leading-6 text-gray-300">
							<p>{infra.description}</p>
							<p className="italic text-gray-400 mt-1">Type: {infra.type}</p>
						</div>
					</article>
				))}
			</div>
		</>
	);
}

export default InfrasChart;
