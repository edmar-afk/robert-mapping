import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddMembers() {
	const [open, setOpen] = useState(false);
	const [households, setHouseholds] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		age: "",
		role: "",
		household: "",
	});
	const [error, setError] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const handleOpen = () => {
		fetchHouseholds();
		setOpen(true);
	};

	const handleClose = () => {
		setFormData({ name: "", age: "", role: "", household: "" });
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async () => {
		try {
			await api.post("/api/householdmembers/", formData);
			handleClose();
		} catch (err) {
			console.error("Add member failed:", err);
			setError("Failed to add member");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-blue-600 text-white px-4 py-2 rounded">
				Add Member
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				sx={style}
				BackdropProps={{
					sx: {
						backgroundColor: "rgba(0, 0, 0, 0.4)",
					},
				}}>
				<div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 z-[999999]">
					<div className="w-[450px]">
						<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add Household Member</h2>
					</div>

					<div className="mt-8 sm:mx-auto w-full">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}>
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700">
										Name
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="name"
											id="name"
											value={formData.name}
											onChange={handleChange}
											placeholder="Name"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="age"
										className="block text-sm font-medium text-gray-700">
										Age
									</label>
									<div className="mt-1">
										<input
											type="number"
											name="age"
											id="age"
											value={formData.age}
											onChange={handleChange}
											placeholder="Age"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="role"
										className="block text-sm font-medium text-gray-700">
										Role
									</label>
									<div className="mt-1">
										<select
											name="role"
											id="role"
											value={formData.role}
											onChange={handleChange}
											required
											className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
											<option
												value=""
												disabled>
												Select Role
											</option>
											<option value="Father">Father</option>
											<option value="Mother">Mother</option>
											<option value="Son">Son</option>
											<option value="Daughter">Daughter</option>
										</select>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="household"
										className="block text-sm font-medium text-gray-700">
										Household
									</label>
									<div className="mt-1">
										<select
											name="household"
											id="household"
											value={formData.household}
											onChange={handleChange}
											required
											className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
											<option
												value=""
												disabled>
												Select Household
											</option>
											{households.map((h) => (
												<option
													key={h.id}
													value={h.id}>
													{h.family_name}
												</option>
											))}
										</select>
									</div>
								</div>

								{error && <p className="text-sm text-red-500 mt-2">{error}</p>}

								<div className="mt-6">
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default AddMembers;
