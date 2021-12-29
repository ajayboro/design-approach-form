import React from "react";

import { Grid, TextField, IconButton, Tooltip } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { FieldArray } from "formik";

const Resources = React.memo(({ index, weekIndex, week, handleChange }) => {
	const resources = {
		resourceName: "",
		color: "",
	};
	return (
		<FieldArray name={`phases.${index}.weeks.${weekIndex}.resources`}>
			{({ push, pop }) => (
				<React.Fragment>
					<Grid container item alignItems="flex-end">
						<Grid xs={12} item>
							<h4>Resources</h4>
						</Grid>
					</Grid>
					{week.resources.length > 0 &&
						week.resources.map((resource, resourceIndex) => (
							<React.Fragment key={weekIndex}>
								<Grid container item alignItems="flex-end">
									<Grid xs={12} item>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.weeks.${weekIndex}.resources.${resourceIndex}.resourceName`}
											name={`phases.${index}.weeks.${weekIndex}.resources.${resourceIndex}.resourceName`}
											label="Resource Name"
											variant="outlined"
											onChange={handleChange}
											value={week.resources[resourceIndex].resourceName}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.weeks.${weekIndex}.resources.${resourceIndex}.color`}
											name={`phases.${index}.weeks.${weekIndex}.resources.${resourceIndex}.color`}
											label="Color"
											variant="outlined"
											onChange={handleChange}
											value={week.resources[resourceIndex].color}
										/>
									</Grid>
								</Grid>
							</React.Fragment>
						))}
					<Grid container item xs={12} justifyContent="flex-end">
						<Grid item>
							{week.resources.length > 0 && (
								<Tooltip title="Delete Resources">
									<IconButton onClick={() => pop()}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							)}
						</Grid>
						<Grid item>
							<Tooltip title="Add Resources">
								<IconButton onClick={() => push(resources)}>
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
export default Resources;
