import AccessibleIcon from "@mui/icons-material/Accessible";import ApartmentIcon from "@mui/icons-material/Apartment";
import ElderlyIcon from "@mui/icons-material/Elderly";
import HouseIcon from "@mui/icons-material/House";
import PeopleIcon from "@mui/icons-material/People";
import React from "react";

function TopBar({ isVisible, onCategorySelect, activeCategory }) {
	const categories = [
		{
			label: "PWD",
			key: "pwds",
			icon: (
				<AccessibleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Infrastructure",
			key: "infras",
			icon: (
				<ApartmentIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Senior Citizens",
			key: "seniors",
			icon: (
				<ElderlyIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Households",
			key: "households",
			icon: (
				<HouseIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
		{
			label: "Feedbacks",
			key: "feedbacks",
			icon: (
				<PeopleIcon
					fontSize="small"
					className="mr-1"
				/>
			),
		},
	];

	return (
		<div
			className={`absolute flex flex-row items-center top-8 left-1/2 transform -translate-x-1/3 z-[9999] transition-transform duration-300 ${
				isVisible ? "scale-100" : "scale-0"
			}`}>
			{categories.map((cat) => (
				<button
					key={cat.key}
					onClick={() => onCategorySelect(cat.key)}
					className={`px-4 py-2 mx-2 rounded-full flex items-center whitespace-nowrap duration-300 ${
						activeCategory === cat.key ? "bg-blue-700 text-white" : "bg-white hover:bg-blue-700 hover:text-white"
					}`}>
					{cat.icon}
					{cat.label}
				</button>
			))}
		</div>
	);
}

export default TopBar;
