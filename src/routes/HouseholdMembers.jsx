import { useEffect, useState } from "react";import api from "../assets/api";
import AddMembers from "../components/admin/AddMembers";

function HouseholdMembers() {
	const [households, setHouseholds] = useState([]);

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-row-reverse items-center justify-between">
				<AddMembers />
				<p
					onClick={fetchHouseholds}
					className="cursor-pointer text-blue-600 hover:underline">
					Refresh
				</p>
			</div>

			<div className="container">
				<h1 className="mb-4 text-xl font-bold">List of Household Members</h1>

				<table className="text-left w-full">
					<thead className="bg-blue-700 flex text-white w-full">
						<tr className="flex w-full mb-2">
							<th className="p-4 w-1/4">Family Name</th>
							<th className="p-4 w-1/4">Member Name</th>
							<th className="p-4 w-1/4">Age</th>
							<th className="p-4 w-1/4">Role</th>
						</tr>
					</thead>
					<tbody
						className="bg-gray-100 flex flex-col items-center justify-start overflow-y-scroll w-full"
						style={{ height: "50vh" }}>
						{households.length > 0 ? (
							households.flatMap((household) =>
								household.members.map((member, idx) => (
									<tr
										key={member.id}
										className="flex w-full mb-2">
										<td className="p-4 w-1/4">{idx === 0 ? household.family_name : ""}</td>
										<td className="p-4 w-1/4">{member.name}</td>
										<td className="p-4 w-1/4">{member.age}</td>
										<td className="p-4 w-1/4">{member.role}</td>
									</tr>
								))
							)
						) : (
							<tr className="flex w-full mb-2">
								<td
									colSpan="4"
									className="p-4 text-center w-full text-gray-500">
									No household members found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}

export default HouseholdMembers;
