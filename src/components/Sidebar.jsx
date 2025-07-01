import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PwdCharts from "./charts/PwdCharts";
import InfrasChart from "./charts/InfrasChart";
import SeniorCharts from "./charts/SeniorCharts";
import HouseholdChart from "./charts/HouseholdChart";
import FeedbackChart from "./charts/FeedbackChart";
import { Link } from "react-router-dom";

function Sidebar({ lat, lng, isVisible, onClose, categoryKey }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(`${lat}, ${lng}`);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000); // reset after 2 seconds
	};

	return (
		<>
			<div
				className={`fixed top-4 z-[999] w-96 h-[calc(100vh-2rem)] bg-white p-4 overflow-y-scroll rounded-xl shadow-lg transition-transform duration-300 ${
					isVisible ? "translate-x-0 left-4" : "-translate-x-full left-0"
				}`}>
				<div className="flex items-center justify-between mb-4">
					<div className="flex flex-row items-center gap-2">
						<p className="w-44 overflow-hidden whitespace-nowrap text-ellipsis">
							{lat}, {lng}
						</p>
						<button
							onClick={handleCopy}
							className="flex cursor-pointer flex-row items-center border px-2 rounded-md text-sm py-1 border-blue-600 bg-blue-100 text-blue-800">
							<ContentCopyIcon fontSize="small" />
							<span className="ml-1">{copied ? "Copied" : "Copy"}</span>
						</button>
					</div>
					<button onClick={onClose}>
						<HighlightOffIcon />
					</button>
				</div>

				<div className="pt-8 space-y-4">
					{categoryKey === "pwds" ? (
						<PwdCharts />
					) : categoryKey === "infras" ? (
						<InfrasChart />
					) : categoryKey === "seniors" ? (
						<SeniorCharts />
					) : categoryKey === "households" ? (
						<HouseholdChart />
					) : categoryKey === "feedbacks" ? (
						<FeedbackChart />
					) : (
						<p className="text-gray-500 text-center pt-44 text-xl">
							No Data found. <Link to={'/login'} className="text-blue-600 font-bold">Login</Link> to add data.
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export default Sidebar;
