import React, { useState } from "react";import { Modal } from "@mui/material";
import api from "../../assets/api";

const style = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

function AddInfrastructures() {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		type: "",
		description: "",
		location: "",
	});
	const [image, setImage] = useState(null);
	const [error, setError] = useState("");

	const handleOpen = () => setOpen(true);

	const handleClose = () => {
		setFormData({
			name: "",
			type: "",
			description: "",
			location: "",
		});
		setImage(null);
		setError("");
		setOpen(false);
	};

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async () => {
		const infraData = new FormData();
		infraData.append("name", formData.name);
		infraData.append("type", formData.type);
		infraData.append("description", formData.description);
		infraData.append("location", formData.location);
		if (image) {
			infraData.append("image", image);
		}

		try {
			const response = await api.post("/api/infras/create/", infraData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Infrastructure added:", response.data);
			handleClose();
		} catch (error) {
			console.error("Add infrastructure failed:", error);
			setError("Failed to add infrastructure");
		}
	};

	return (
		<>
			<button
				onClick={handleOpen}
				className="bg-blue-600 text-white px-4 py-2 rounded">
				Add Infrastructure
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
						<h2 className="mt-6 text-center text-3xl font-extrabold text-white">Add Infrastructure</h2>
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
										htmlFor="type"
										className="block text-sm font-medium text-gray-700">
										Type
									</label>
									<div className="mt-1">
										<input
											type="text"
											name="type"
											id="type"
											value={formData.type}
											onChange={handleChange}
											placeholder="Type"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="mt-6">
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700">
										Description
									</label>
									<div className="mt-1">
										<textarea
											name="description"
											id="description"
											value={formData.description}
											onChange={handleChange}
											rows="3"
											placeholder="Description"
											required
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
										/>
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
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
										/>
									</div>
								</div>

								<div className="mt-6">
									<label className="block text-sm font-medium text-gray-700">Image</label>
									<div className="mt-1">
										<input
											type="file"
											accept="image/png, image/jpeg, image/jpg"
											onChange={handleImageChange}
											className="block w-full text-sm text-gray-600"
										/>
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

export default AddInfrastructures;
