import ElderlyIcon from "@mui/icons-material/Elderly";
function Seniors({ name, age, gender }) {
	return (
		<div className="w-fit text-center bg-blue-800 rounded-lg lg:mt-0 xl:px-10">
			<div className="space-y-4 xl:space-y-6">
				<ElderlyIcon
					className="text-white pt-4"
					sx={{ fontSize: 60 }}
				/>
				<div className="space-y-2">
					<div className="flex justify-center items-center flex-col text-lg font-medium">
						<h3 className="text-white -mb-5">
							{name}, {age} ({gender})
						</h3>
						<p className="text-indigo-300">Senior Resident of Matin-ao</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Seniors;
