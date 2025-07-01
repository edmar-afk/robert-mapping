import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddHousehold from "../components/admin/AddHousehold";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Household() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteHousehold = async (id) => {
		try {
			await api.delete(`/api/households/delete/${id}/`);
			setHouseholds((prev) => prev.filter((h) => h.id !== id));
		} catch (err) {
			console.error("Failed to delete household:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddHousehold />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container">
				<h1 className="mb-4 text-xl font-bold">List of Households</h1>

				<table className="text-left w-full">
					<thead className="bg-blue-700 flex text-white w-full">
						<tr className="flex w-full mb-2">
							<th className="p-4 w-3/4">Family Name</th>
							<th className="p-4 w-1/4">Actions</th>
						</tr>
					</thead>
					<tbody
						className="bg-gray-100 flex flex-col items-center justify-start overflow-y-scroll w-full"
						style={{ height: "50vh" }}>
						{households.length > 0 ? (
							households.map((household) => (
								<tr
									key={household.id}
									className="flex w-full mb-2">
									<td className="p-4 w-3/4">{household.family_name}</td>
									<td className="p-4 w-1/4">
										<button
											type="button"
											onClick={() => deleteHousehold(household.id)}
											className="text-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
											<DeleteForeverIcon fontSize="large" />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr className="flex w-full mb-2">
								<td
									colSpan="2"
									className="p-4 text-center w-full text-gray-500">
									No household records found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default Household;
