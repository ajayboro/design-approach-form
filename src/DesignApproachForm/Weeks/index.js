import React from "react";

import { Grid, TextField, IconButton, Tooltip } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { FieldArray } from "formik";

const Weeks = React.memo(({ index, phase, handleChange }) => {
	const weeks = {
		weekNumber: "",
		resources: "",
	};
	return (
		<FieldArray name={`phases.${index}.weeks`}>
			{({ push, pop }) => (
				<React.Fragment>
					<Grid container item alignItems="flex-end">
						<Grid xs={12} item>
							<h4>Weeks</h4>
						</Grid>
					</Grid>
					{phase.weeks.length > 0 &&
						phase.weeks.map((week, weekIndex) => (
							<React.Fragment key={weekIndex}>
								<Grid container item alignItems="flex-end">
									<Grid xs={12} item>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.weeks.${weekIndex}.weekNumber`}
											name={`phases.${index}.weeks.${weekIndex}.weekNumber`}
											label="Week number"
											variant="outlined"
											onChange={handleChange}
											value={phase.weeks[weekIndex].weekNumber}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.weeks.${weekIndex}.resources`}
											name={`phases.${index}.weeks.${weekIndex}.resources`}
											label="Resources"
											variant="outlined"
											onChange={handleChange}
											value={phase.weeks[weekIndex].resources}
										/>
									</Grid>
								</Grid>
							</React.Fragment>
						))}
					<Grid container item xs={12} justifyContent="flex-end">
						<Grid item>
							{phase.weeks.length > 0 && (
								<Tooltip title="Delete">
									<IconButton onClick={() => pop()}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							)}
						</Grid>
						<Grid item>
							<Tooltip title="Add">
								<IconButton onClick={() => push(weeks)}>
									<AddIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</React.Fragment>
			)}
		</FieldArray>
	);
});
export default Weeks;
