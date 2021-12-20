import React from "react";

import {
	Grid,
	TextField,
	Container,
	Button,
	IconButton,
	Select,
	MenuItem,
	Chip,
	FormControl,
	InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Formik, FieldArray } from "formik";
import { useStyles } from "./styles";

const DesignApproachForm = () => {
	const initialValues = {
		description: "",
		workflowLink: "",
		featureLink: "",
		phases: [],
	};
	const weekNames = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];
	const classes = useStyles();

	return (
		<Container maxWidth="md">
			<Formik
				initialValues={initialValues}
				onSubmit={values => {
					console.log(values);
				}}
			>
				{({ values, handleSubmit, handleChange }) => (
					<form onSubmit={handleSubmit} autoComplete="off">
						<Grid
							container
							justifyContent="space-between"
							alignItems="flex-end"
						>
							<Grid item xs={11}>
								<Grid container item alignItems="flex-end">
									<h1>Design approach</h1>
									<Grid xs={11} item>
										<TextField
											fullWidth
											margin="normal"
											multiline
											minRows={4}
											type="text"
											id="description"
											name="description"
											label="Description"
											variant="outlined"
											onChange={handleChange}
											value={values.description}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id="workflowLink"
											name="workflowLink"
											label="Workflow Link"
											variant="outlined"
											onChange={handleChange}
											value={values.workflowLink}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="text"
											id="featureLink"
											name="featureLink"
											label="Feature Link"
											variant="outlined"
											onChange={handleChange}
											value={values.featureLink}
										/>
									</Grid>
								</Grid>
								<FieldArray name="phases">
									{({ push }) => (
										<>
											<Grid container item justifyContent="flex-end">
												<Grid item xs={1}>
													<IconButton
														onClick={() =>
															push({
																phaseName: "",
																description: "",
																subModules: [],
																paymentBreakdown: [],
																resources: [],
																weeks: [],
																totalPrice: 0,
															})
														}
													>
														<AddIcon />
													</IconButton>
												</Grid>
											</Grid>
											{values.phases.map((phase, index) => (
												<div key={index}>
													<Grid xs={11} item>
														<h2>Phases {index + 1}</h2>
													</Grid>
													<Grid container item alignItems="flex-end">
														<Grid xs={11} item>
															<TextField
																fullWidth
																margin="normal"
																type="text"
																id={`phases.${index}.phaseName`}
																name={`phases.${index}.phaseName`}
																label="Phase name"
																variant="outlined"
																onChange={handleChange}
																value={values.phases.phaseName}
															/>
															<TextField
																fullWidth
																margin="normal"
																multiline
																minRows={4}
																type="text"
																id={`phases.${index}.description`}
																name={`phases.${index}.description`}
																label="Description"
																variant="outlined"
																onChange={handleChange}
																value={values.phases.description}
															/>
														</Grid>
													</Grid>
													<FieldArray name={`phases.${index}.subModules`}>
														{({ push }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={11} item>
																		<h4>Sub Modules</h4>
																	</Grid>
																	<Grid item xs={1}>
																		<IconButton
																			onClick={() => {
																				push({
																					subPhaseName: "",
																					weeks: [],
																				});
																			}}
																		>
																			<AddIcon />
																		</IconButton>
																	</Grid>
																</Grid>
																{phase.subModules.map(
																	(module, subModuleIndex) => (
																		<div key={subModuleIndex}>
																			<Grid
																				container
																				item
																				alignItems="flex-end"
																			>
																				<Grid xs={11} item>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="text"
																						id={`phases.${index}.subModules.${subModuleIndex}.subPhaseName`}
																						name={`phases.${index}.subModules.${subModuleIndex}.subPhaseName`}
																						label="Sub phase name"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.subModules[subModuleIndex]
																								.subPhaseName
																						}
																					/>
																					<FormControl
																						margin="normal"
																						fullWidth
																					>
																						<InputLabel
																							className={
																								classes.inputLabelStyle
																							}
																						>
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
																							value={
																								phase.subModules[subModuleIndex]
																									.weeks
																							}
																							renderValue={selected => (
																								<div
																									className={
																										classes.renderValueStyle
																									}
																								>
																									{selected.map(
																										(chip, chipIndex) => (
																											<Chip
																												key={chipIndex}
																												label={chip}
																												className={
																													classes.chipStyle
																												}
																											/>
																										),
																									)}
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
																							{weekNames.map(
																								(weekName, weekIndex) => (
																									<MenuItem
																										key={weekIndex}
																										value={weekName}
																									>
																										{weekName}
																									</MenuItem>
																								),
																							)}
																						</Select>
																					</FormControl>
																				</Grid>
																			</Grid>
																		</div>
																	),
																)}
															</>
														)}
													</FieldArray>
													<FieldArray name={`phases.${index}.paymentBreakdown`}>
														{({ push }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={11} item>
																		<h4>Payment breakdown</h4>
																	</Grid>
																	<Grid item xs={1}>
																		<IconButton
																			onClick={() =>
																				push({
																					advancePayment: 0,
																					prdAndPrototye: 0,
																					developmentCompletion: 0,
																					qaAndFinalDeployment: 0,
																				})
																			}
																		>
																			<AddIcon />
																		</IconButton>
																	</Grid>
																</Grid>
																{phase.paymentBreakdown.map(
																	(payment, paymentIndex) => (
																		<div key={paymentIndex}>
																			<Grid
																				container
																				item
																				alignItems="flex-end"
																			>
																				<Grid xs={11} item>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="number"
																						id={`phases.${index}.paymentBreakdown.${paymentIndex}.advancePayment`}
																						name={`phases.${index}.paymentBreakdown.${paymentIndex}.advancePayment`}
																						label="Advance Payment"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.paymentBreakdown[
																								paymentIndex
																							].advancePayment
																						}
																					/>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="number"
																						id={`phases.${index}.paymentBreakdown.${paymentIndex}.prdAndPrototye`}
																						name={`phases.${index}.paymentBreakdown.${paymentIndex}.prdAndPrototye`}
																						label="PRD and prototype"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.paymentBreakdown[
																								paymentIndex
																							].prdAndPrototye
																						}
																					/>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="number"
																						id={`phases.${index}.paymentBreakdown.${paymentIndex}.developmentCompletion`}
																						name={`phases.${index}.paymentBreakdown.${paymentIndex}.developmentCompletion`}
																						label="Development completion"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.paymentBreakdown[
																								paymentIndex
																							].developmentCompletion
																						}
																					/>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="number"
																						id={`phases.${index}.paymentBreakdown.${paymentIndex}.qaAndFinalDeployment`}
																						name={`phases.${index}.paymentBreakdown.${paymentIndex}.qaAndFinalDeployment`}
																						label="QA and final deployment"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.paymentBreakdown[
																								paymentIndex
																							].qaAndFinalDeployment
																						}
																					/>
																				</Grid>
																			</Grid>
																		</div>
																	),
																)}
															</>
														)}
													</FieldArray>
													<FieldArray name={`phases.${index}.resources`}>
														{({ push }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={11} item>
																		<h4>Resources</h4>
																	</Grid>
																	<Grid item xs={1}>
																		<IconButton
																			onClick={() =>
																				push({
																					resourceType: "",
																					quantity: 0,
																					involvement: "",
																					rate: 0,
																				})
																			}
																		>
																			<AddIcon />
																		</IconButton>
																	</Grid>
																</Grid>
																{phase.resources.map(
																	(resource, resourceIndex) => (
																		<div key={resourceIndex}>
																			<Grid
																				container
																				item
																				alignItems="flex-end"
																			>
																				<Grid xs={11} item>
																					<TextField
																						fullWidth
																						margin="normal"
																						type="text"
																						id={`phases.${index}.resources.${resourceIndex}.resourceType`}
																						name={`phases.${index}.resources.${resourceIndex}.resourceType`}
																						label="Resource type"
																						variant="outlined"
																						onChange={handleChange}
																						value={
																							phase.resources[resourceIndex]
																								.resourceType
																						}
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
																						value={
																							phase.resources[resourceIndex]
																								.quantity
																						}
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
																						value={
																							phase.resources[resourceIndex]
																								.involvement
																						}
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
																						value={
																							phase.resources[resourceIndex]
																								.rate
																						}
																					/>
																				</Grid>
																			</Grid>
																		</div>
																	),
																)}
															</>
														)}
													</FieldArray>
													<FieldArray name={`phases.${index}.weeks`}>
														{({ push }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={11} item>
																		<h4>Weeks</h4>
																	</Grid>
																	<Grid item xs={1}>
																		<IconButton
																			onClick={() =>
																				push({
																					weekNumber: "",
																					resources: "",
																				})
																			}
																		>
																			<AddIcon />
																		</IconButton>
																	</Grid>
																</Grid>
																{phase.weeks.map((week, weekIndex) => (
																	<div key={weekIndex}>
																		<Grid container item alignItems="flex-end">
																			<Grid xs={11} item>
																				<TextField
																					fullWidth
																					margin="normal"
																					type="text"
																					id={`phases.${index}.weeks.${weekIndex}.weekNumber`}
																					name={`phases.${index}.weeks.${weekIndex}.weekNumber`}
																					label="Week number"
																					variant="outlined"
																					onChange={handleChange}
																					value={
																						phase.weeks[weekIndex].weekNumber
																					}
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
																					value={phase.weeks[index].resources}
																				/>
																			</Grid>
																		</Grid>
																	</div>
																))}
															</>
														)}
													</FieldArray>
													<Grid item xs={11}>
														<TextField
															fullWidth
															margin="normal"
															type="number"
															id={`phases.${index}.totalPrice`}
															name={`phases.${index}.totalPrice`}
															label="Total price"
															variant="outlined"
															onChange={handleChange}
															value={values.phases.totalPrice}
														/>
													</Grid>
												</div>
											))}
										</>
									)}
								</FieldArray>
							</Grid>
							<Grid item xs={10}>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									size="large"
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</form>
				)}
			</Formik>
		</Container>
	);
};

export default DesignApproachForm;