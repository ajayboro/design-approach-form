import React from "react";
import { Grid, TextField, IconButton, Tooltip } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { FieldArray } from "formik";

const Resources = React.memo(({ index, phase, handleChange }) => {
	const resources = {
		resourceType: "",
		quantity: 0,
		involvement: "",
		rate: 0,
	};
	return (
		<FieldArray name={`phases.${index}.resources`}>
			{({ push, pop }) => (
				<React.Fragment>
					<Grid container item alignItems="flex-end">
						<Grid xs={12} item>
							<h4>Resources</h4>
						</Grid>
					</Grid>
					{phase.resources.length > 0 &&
						phase.resources.map((resource, resourceIndex) => (
							<div key={resourceIndex}>
								<Grid container item alignItems="flex-end">
									<Grid xs={12} item>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.resources.${resourceIndex}.resourceType`}
											name={`phases.${index}.resources.${resourceIndex}.resourceType`}
											label="Resource type"
											variant="outlined"
											onChange={handleChange}
											value={phase.resources[resourceIndex].resourceType}
										/>

										<TextField
											fullWidth
											margin="normal"
											type="number"
											id={`phases.${index}.resources.${resourceIndex}.quantity`}
											name={`phases.${index}.resources.${resourceIndex}.quantity`}
											label="Quantity"
											variant="outlined"
											onChange={handleChange}
											value={phase.resources[resourceIndex].quantity}
											InputProps={{
												inputProps: { min: 0 },
											}}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.resources.${resourceIndex}.involvement`}
											name={`phases.${index}.resources.${resourceIndex}.involvement`}
											label="Involvement"
											variant="outlined"
											onChange={handleChange}
											value={phase.resources[resourceIndex].involvement}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="number"
											id={`phases.${index}.resources.${resourceIndex}.rate`}
											name={`phases.${index}.resources.${resourceIndex}.rate`}
											label="Rate"
											variant="outlined"
											onChange={handleChange}
											value={phase.resources[resourceIndex].rate}
											InputProps={{
												inputProps: { min: 0 },
											}}
										/>
									</Grid>
								</Grid>
							</div>
						))}
					<Grid container item xs={12} justifyContent="flex-end">
						<Grid item>
							{phase.resources.length > 0 && (
								<Tooltip title="Delete">
									<IconButton onClick={() => pop()}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							)}
						</Grid>
						<Grid item>
							<Tooltip title="Add">
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
