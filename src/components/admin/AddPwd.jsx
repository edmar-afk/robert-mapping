import React, { useState } from "react";
import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddPwd() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		people: "",
		age: "",
		gender: "",
		location: "",
	});
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setFormData({ people: "", age: "", gender: "", location: "" });
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
			const response = await api.post("/api/pwds/", formData);
			console.log("Added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add failed:", error);
			setError("Failed to add data");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-blue-600 text-white px-4 py-2 rounded">
				Add PWD
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
						<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add PWD</h2>
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
										htmlFor="people"
										className="block text-sm font-medium text-gray-700">
										Full Name
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="people"
											id="people"
											value={formData.people}
											onChange={handleChange}
											placeholder="John Doe"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
											placeholder="30"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="gender"
										className="block text-sm font-medium text-gray-700">
										Gender
									</label>
									<div className="mt-1">
										<select
											name="gender"
											id="gender"
											value={formData.gender}
											onChange={handleChange}
											required
											className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
											<option
												value=""
												disabled>
												Select Gender
											</option>
											<option value="Male">Male</option>
											<option value="Female">Female</option>
										</select>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="location"
										className="block text-sm font-medium text-gray-700">
										Location
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="location"
											id="location"
											value={formData.location}
											onChange={handleChange}
											placeholder="Location"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										/>
									</div>
								</div>

								{error && <p className="text-sm text-red-500 mt-2">{error}</p>}

								<div className="mt-6">
									<button
										type="submit"
										className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
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

export default AddPwd;
