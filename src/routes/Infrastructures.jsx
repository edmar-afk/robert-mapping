import { useEffect, useState } from "react";import api from "../assets/api";
import AddInfrastructures from "../components/admin/AddInfrastructures";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Infrastructure() {
	const [infras, setInfras] = useState([]);

	const fetchInfras = async () => {
		try {
			const res = await api.get("/api/infras/");
			setInfras(res.data);
		} catch (err) {
			console.error("Failed to fetch Infrastructures:", err);
		}
	};

	const deleteInfra = async (id) => {
		try {
			await api.delete(`/api/infrastructure/delete/${id}/`);
			setInfras((prev) => prev.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Failed to delete Infrastructure:", err);
		}
	};

	useEffect(() => {
		fetchInfras();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddInfrastructures />
				<p
					onClick={fetchInfras}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container">
				<h1 className="mb-4 text-xl font-bold">Lists of Infrastructures</h1>

				<table className="text-left w-full">
					<thead className="bg-blue-700 flex text-white w-full">
						<tr className="flex w-full mb-2">
							<th className="p-4 w-1/5">Image</th>
							<th className="p-4 w-1/5">Name</th>
							<th className="p-4 w-1/5">Type</th>
							<th className="p-4 w-2/5">Description</th>
							<th className="p-4 w-1/5">Actions</th>
						</tr>
					</thead>
					<tbody
						className="bg-gray-100 flex flex-col items-center justify-start overflow-y-scroll w-full"
						style={{ height: "50vh" }}>
						{infras.length > 0 ? (
							infras.map((infra) => (
								<tr
									key={infra.id}
									className="flex w-full mb-2">
									<td className="p-4 w-1/5">
										{infra.image ? (
											<img
												src={infra.image}
												alt="infra"
												className="w-16 h-16 object-cover rounded"
											/>
										) : (
											<span className="text-gray-400 italic">No Image</span>
										)}
									</td>
									<td className="p-4 w-1/5">{infra.name}</td>
									<td className="p-4 w-1/5">{infra.type}</td>
									<td className="p-4 w-2/5">{infra.description}</td>
									<td className="p-4 w-1/5">
										<button
											type="button"
											onClick={() => deleteInfra(infra.id)}
											className="text-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
											<DeleteForeverIcon fontSize="large" />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr className="flex w-full mb-2">
								<td
									colSpan="5"
									className="p-4 text-center w-full text-gray-500">
									No infrastructure records found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default Infrastructure;
