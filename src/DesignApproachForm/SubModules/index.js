import React from "react";

import {
	Grid,
	TextField,
	IconButton,
	Select,
	MenuItem,
	Chip,
	FormControl,
	InputLabel,
	Tooltip,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { FieldArray } from "formik";

import { useStyles } from "./styles";

const SubModules = React.memo(({ index, phase, weekNames, handleChange }) => {
	const subModules = {
		subPhaseName: "",
		weeks: [],
	};
	const classes = useStyles();

	return (
		<FieldArray name={`phases.${index}.subModules`}>
			{({ push, pop }) => (
				<React.Fragment>
					<Grid container item alignItems="flex-end">
						<Grid xs={12} item>
							<h4>Sub Modules</h4>
						</Grid>
					</Grid>

					{phase.subModules.length > 0 &&
						phase.subModules.map((module, subModuleIndex) => (
							<React.Fragment key={subModuleIndex}>
								<Grid container item alignItems="flex-end">
									<Grid xs={12} item>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id={`phases.${index}.subModules.${subModuleIndex}.subPhaseName`}
											name={`phases.${index}.subModules.${subModuleIndex}.subPhaseName`}
											label="Sub phase name"
											variant="outlined"
											onChange={handleChange}
											value={phase.subModules[subModuleIndex].subPhaseName}
										/>
										<FormControl margin="normal" fullWidth>
											<InputLabel className={classes.inputLabelStyle}>
												Weeks
											</InputLabel>
											<Select
												fullWidth
												multiple
												id={`phases.${index}.subModules.${subModuleIndex}.weeks`}
												name={`phases.${index}.subModules.${subModuleIndex}.weeks`}
												onChange={handleChange}
												label="Weeks"
												variant="outlined"
												value={phase.subModules[subModuleIndex].weeks}
												renderValue={selected => (
													<div className={classes.renderValueStyle}>
														{selected.map((chip, chipIndex) => (
															<Chip
																key={chipIndex}
																label={chip}
																className={classes.chipStyle}
															/>
														))}
													</div>
												)}
												MenuProps={{
													MenuListProps: {
														disablePadding: true,
													},
													anchorOrigin: {
														vertical: "bottom",
														horizontal: "center",
													},
													transformOrigin: {
														vertical: "top",
														horizontal: "center",
													},
													getContentAnchorEl: null,
												}}
											>
												{weekNames &&
													weekNames.map((weekName, weekIndex) => (
														<MenuItem key={weekIndex} value={weekName}>
															{weekName}
														</MenuItem>
													))}
											</Select>
										</FormControl>
									</Grid>
								</Grid>
							</React.Fragment>
						))}
					<Grid container item xs={12} justifyContent="flex-end">
						<Grid item>
							{phase.subModules.length > 0 && (
								<Tooltip title="Delete">
									<IconButton onClick={() => pop()}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							)}
						</Grid>
						<Grid item>
							<Tooltip title="Add">
								<IconButton onClick={() => push(subModules)}>
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

export default SubModules;
