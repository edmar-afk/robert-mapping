import React, { useEffect, useState } from "react";import api from "../assets/api";
import AccessibleIcon from "@mui/icons-material/Accessible";
import GroupIcon from "@mui/icons-material/Group";
import ElderlyIcon from "@mui/icons-material/Elderly";
import LocationCityIcon from "@mui/icons-material/LocationCity";

function Dashboard() {
	const [stats, setStats] = useState({
		total_pwds: 0,
		total_seniors: 0,
		total_households: 0,
		total_infrastructures: 0,
	});

	useEffect(() => {
		api.get("/api/stats/").then((res) => {
			setStats(res.data);
		});
	}, []);

	return (
		<div className="h-screen">
			<div className="col-span-3 md:col-span-2 flex flex-col items-center md:items-start gap-4 pt-16 px-2">
				<p className="flex justify-center w-full gap-2 pt-4 font-extrabold text-2xl md:text-3xl">
					<span>Matin-ao Overall statistics</span>
				</p>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 pb-8 pt-4 mx-auto">
					<div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32">
						<div className="flex gap-2 items-center">
							<span className="font-bold text-3xl md:text-4xl">{stats.total_pwds}</span>
							<AccessibleIcon
								className="text-blue-500"
								sx={{ fontSize: 32 }}
							/>
						</div>
						<span className="font-semibold text-sm text-center">PWDs</span>
					</div>

					<div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32">
						<div className="flex gap-2 items-center">
							<span className="font-bold text-3xl md:text-4xl">{stats.total_seniors}</span>
							<ElderlyIcon
								className="text-green-600"
								sx={{ fontSize: 32 }}
							/>
						</div>
						<span className="font-semibold text-sm text-center">Seniors</span>
					</div>

					<div className="flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32">
						<div className="flex gap-2 items-center">
							<span className="font-bold text-3xl md:text-4xl">{stats.total_households}</span>
							<GroupIcon
								className="text-purple-600"
								sx={{ fontSize: 32 }}
							/>
						</div>
						<span className="font-semibold text-sm text-center">Households</span>
					</div>

					<div className="md:col-start-2 lg:col-auto flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-500/50 p-4 rounded-md h-32">
						<div className="flex gap-2 items-center">
							<span className="font-bold text-3xl md:text-4xl">{stats.total_infrastructures}</span>
							<LocationCityIcon
								className="text-orange-600"
								sx={{ fontSize: 32 }}
							/>
						</div>
						<span className="font-semibold text-sm text-center">Infrastructures</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
