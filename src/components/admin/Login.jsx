import React, { useState } from "react";import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<section className="bg-gray-100 min-h-screen flex justify-center items-center">
			<div className="bg-blue-600 rounded-2xl flex max-w-3xl p-5 items-center">
				<div className="md:w-1/2 px-8">
					<h2 className="font-bold text-3xl text-white">Login</h2>
					<p className="text-sm mt-4 text-white">Login to input data on Matin-ao, Zamboanga del Sur</p>

					<form
						className="flex flex-col gap-4"
						onSubmit={handleLogin}>
						<input
							className="p-2 mt-8 rounded-xl bg-white border"
							type="text"
							name="username"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<div className="relative">
							<input
								className="p-2 rounded-xl border w-full bg-white"
								type="password"
								name="password"
								id="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						
						</div>
						{error && <p className="text-sm text-red-500 mt-1">{error}</p>}
						<button
							className="bg-white text-blue-600 py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
							type="submit">
							Login
						</button>
					</form>
				</div>

				<div className="md:block hidden w-1/2">
					<img
						className="rounded-2xl max-h-[1600px]"
						src="https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxmcmVzaHxlbnwwfDF8fHwxNzEyMTU4MDk0fDA&ixlib=rb-4.0.3&q=80&w=1080"
						alt="login form image"
					/>
				</div>
			</div>
		</section>
	);
}
