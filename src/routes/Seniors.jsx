import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddSeniors from "../components/admin/AddSeniors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Seniors() {
	const [seniors, setSeniors] = useState([]);

	const fetchSeniors = async () => {
		try {
			const res = await api.get("/api/seniors/");
			setSeniors(res.data);
		} catch (err) {
			console.error("Failed to fetch Seniors:", err);
		}
	};

	const deleteSenior = async (id) => {
		try {
			await api.delete(`/api/seniors/${id}/`);
			setSeniors((prev) => prev.filter((s) => s.id !== id));
		} catch (err) {
			console.error("Failed to delete Senior:", err);
		}
	};

	useEffect(() => {
		fetchSeniors();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddSeniors />
				<p
					onClick={fetchSeniors}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container">
				<h1 className="mb-4 text-xl font-bold">Lists of Seniors</h1>

				<table className="text-left w-full">
					<thead className="bg-blue-700 flex text-white w-full">
						<tr className="flex w-full mb-2">
							<th className="p-4 w-1/4">Name</th>
							<th className="p-4 w-1/4">Age</th>
							<th className="p-4 w-1/4">Gender</th>
							<th className="p-4 w-1/4">Actions</th>
						</tr>
					</thead>
					<tbody
						className="bg-gray-100 flex flex-col items-center justify-start overflow-y-scroll w-full"
						style={{ height: "50vh" }}>
						{seniors.length > 0 ? (
							seniors.map((senior) => (
								<tr
									key={senior.id}
									className="flex w-full mb-2">
									<td className="p-4 w-1/4">{senior.people}</td>
									<td className="p-4 w-1/4">{senior.age}</td>
									<td className="p-4 w-1/4">{senior.gender}</td>
									<td className="p-4 w-1/4">
										<button
											type="button"
											onClick={() => deleteSenior(senior.id)}
											className="text-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
											<DeleteForeverIcon fontSize="large" />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr className="flex w-full mb-2">
								<td
									colSpan="4"
									className="p-4 text-center w-full text-gray-500">
									No Senior records found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default Seniors;
