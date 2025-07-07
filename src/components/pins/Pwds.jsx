import React from "react";import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";

function Pwds({ name, age, gender }) {
	return (
		<div className="w-fit text-center bg-blue-800 rounded-lg lg:mt-0 xl:px-10">
			<div className="space-y-4 xl:space-y-6">
				<WheelchairPickupIcon
					className="text-white pt-4"
					sx={{ fontSize: 60 }}
				/>
				<div className="space-y-2">
					<div className="flex justify-center items-center flex-col text-lg font-medium">
						<h3 className="text-white -mb-5">
							{name}, {age} ({gender})
						</h3>
						<p className="text-indigo-300">PWD Resident of Matin-ao</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Pwds;
