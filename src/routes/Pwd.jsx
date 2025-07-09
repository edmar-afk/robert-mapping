import React, { useEffect, useState } from "react";import api from "../assets/api";
import AddPwd from "../components/admin/AddPwd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function Pwd() {
	const [pwds, setPwds] = useState([]);

	const fetchPwds = async () => {
		try {
			const res = await api.get("/api/pwds/");
			setPwds(res.data);
		} catch (err) {
			console.error("Failed to fetch PWDs:", err);
		}
	};

	const deletePwd = async (id) => {
		try {
			await api.delete(`/api/pwd/delete/${id}/`);
			setPwds((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error("Failed to delete PWD:", err);
		}
	};

	useEffect(() => {
		fetchPwds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddPwd />
				<p
					onClick={fetchPwds}
					className="cursor-pointer text-purple-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container">
				<h1 className="mb-4 text-xl font-bold">Lists of PWD</h1>

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
						{pwds.length > 0 ? (
							pwds.map((pwd) => (
								<tr
									key={pwd.id}
									className="flex w-full mb-2">
									<td className="p-4 w-1/4">{pwd.people}</td>
									<td className="p-4 w-1/4">{pwd.age}</td>
									<td className="p-4 w-1/4">{pwd.gender}</td>
									<td className="p-4 w-1/4">
										<button
											type="button"
											onClick={() => deletePwd(pwd.id)}
											className="text-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
											<DeleteForeverIcon fontSize="large"/>
										</button>
									</td>
								</tr>
							))
						) : (
							<tr className="flex w-full mb-2">
								<td
									colSpan="4"
									className="p-4 text-center w-full text-gray-500">
									No PWD records found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default Pwd;
