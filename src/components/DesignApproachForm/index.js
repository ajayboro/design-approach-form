import React, { useState } from "react";

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
import RemoveIcon from "@material-ui/icons/Remove";
import { Formik, FieldArray } from "formik";
import { useStyles } from "./styles";

import * as yup from "yup";

const DesignApproachSchema = yup.object({
	description: yup.string().required("Required"),
	workflowLink: yup.string().url("Invalid url").required("Required"),
	featureLink: yup.string().url("Invalid url").required("Required"),

	phases: yup.array().of(
		yup.object({
			phaseName: yup.string().required("Required"),
			description: yup.string().required("Required"),
			subModules: yup.array().of(
				yup.object({
					subPhaseName: yup.string().required("Required"),
				}),
			),
			paymentBreakdown: yup.array().of(
				yup.object({
					advancePayment: yup.number().required("Required"),
					prdAndPrototye: yup.number().required("Required"),
					developmentCompletion: yup.number().required("Required"),
					qaAndFinalDeployment: yup.number().required("Required"),
				}),
			),
			resources: yup.array().of(
				yup.object({
					resourceType: yup.string().required("Required"),
					quantity: yup.number().required("Required"),
					involvement: yup.string().required("Required"),
					rate: yup.number().required("Required"),
				}),
			),
			weeks: yup.array().of(
				yup.object({
					weekNumber: yup.string().required("Required"),
					resources: yup.string().required("Required"),
				}),
			),
			totalPrice: yup.number().required("Required"),
		}),
	),
});
const DesignApproachForm = () => {
	const initialValues = {
		description: "",
		workflowLink: "",
		featureLink: "",
		phases: [],
	};

	let weekNames = [];

	const [numOfWeeks, setNumOfWeeks] = useState(0);

	const handleChangeWeeks = e => {
		const value = e.target.value;
		setNumOfWeeks(value);
	};

	for (let i = 1; i <= numOfWeeks; i++) {
		weekNames.push(`W${i}`);
	}

	const classes = useStyles();
	return (
		<Container maxWidth="md">
			<Formik
				initialValues={initialValues}
				onSubmit={values => {
					console.log(values);
				}}
				validationSchema={DesignApproachSchema}
			>
				{({
					values,
					handleSubmit,
					handleChange,
					handleBlur,
					touched,
					errors,
				}) => (
					<form onSubmit={handleSubmit} autoComplete="off">
						<Grid container justifyContent="center" alignItems="flex-end">
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
											onBlur={handleBlur}
											error={touched.description && Boolean(errors.description)}
											helperText={touched.description && errors.description}
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
											onBlur={handleBlur}
											error={
												touched.workflowLink && Boolean(errors.workflowLink)
											}
											helperText={touched.workflowLink && errors.workflowLink}
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
											onBlur={handleBlur}
											error={touched.featureLink && Boolean(errors.featureLink)}
											helperText={touched.featureLink && errors.featureLink}
										/>
										<TextField
											fullWidth
											margin="normal"
											type="number"
											label="Number of weeks"
											name="numOfWeeks"
											variant="outlined"
											value={numOfWeeks}
											onChange={handleChangeWeeks}
											InputProps={{ inputProps: { min: 0 } }}
										/>
									</Grid>
								</Grid>
								<FieldArray name="phases">
									{({ push, remove }) => (
										<>
											<Grid container item justifyContent="flex-end">
												<Grid container item xs={2} justifyContent="flex-end">
													<Grid item>
														<IconButton
															onClick={() => {
																remove({
																	phaseName: "",
																	description: "",
																	subModules: [],
																	paymentBreakdown: [],
																	resources: [],
																	weeks: [],
																	totalPrice: undefined,
																});
															}}
														>
															<RemoveIcon />
														</IconButton>
													</Grid>
													<Grid item>
														<IconButton
															onClick={() => {
																push({
																	phaseName: "",
																	description: "",
																	subModules: [],
																	paymentBreakdown: [],
																	resources: [],
																	weeks: [],
																	totalPrice: undefined,
																});
															}}
														>
															<AddIcon />
														</IconButton>
													</Grid>
												</Grid>
											</Grid>
											{values.phases.map((phase, index) => (
												<div key={index}>
													<Grid xs={10} item>
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
																onBlur={handleBlur}
																error={
																	touched?.phases?.[index]?.phaseName &&
																	Boolean(errors.phases?.[index].phaseName)
																}
																helperText={
																	touched?.phases?.[index]?.phaseName &&
																	errors.phases?.[index].phaseName
																}
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
																onBlur={handleBlur}
																error={
																	touched?.phases?.[index]?.description &&
																	Boolean(errors.phases?.[index].description)
																}
																helperText={
																	touched?.phases?.[index]?.description &&
																	errors.phases?.[index].description
																}
															/>
														</Grid>
													</Grid>
													<FieldArray name={`phases.${index}.subModules`}>
														{({ push, remove }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={10} item>
																		<h4>Sub Modules</h4>
																	</Grid>
																	<Grid
																		container
																		item
																		xs={2}
																		justifyContent="flex-end"
																	>
																		<Grid item>
																			<IconButton
																				onClick={() => {
																					remove({
																						subPhaseName: "",
																						weeks: [],
																					});
																				}}
																			>
																				<RemoveIcon />
																			</IconButton>
																		</Grid>
																		<Grid item>
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.subModules?.[subModuleIndex]
																								?.subPhaseName &&
																							Boolean(
																								errors.phases?.[index]
																									.subModules?.[subModuleIndex]
																									.subPhaseName,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.subModules?.[subModuleIndex]
																								?.subPhaseName &&
																							errors.phases?.[index]
																								.subModules?.[subModuleIndex]
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
																							{weekNames &&
																								weekNames.map(
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
														{({ push, remove }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={10} item>
																		<h4>Payment breakdown</h4>
																	</Grid>
																	<Grid
																		container
																		item
																		xs={2}
																		justifyContent="flex-end"
																	>
																		<Grid item>
																			<IconButton
																				onClick={() =>
																					remove({
																						advancePayment: undefined,
																						prdAndPrototye: undefined,
																						developmentCompletion: undefined,
																						qaAndFinalDeployment: undefined,
																					})
																				}
																			>
																				<RemoveIcon />
																			</IconButton>
																		</Grid>
																		<Grid item>
																			<IconButton
																				onClick={() =>
																					push({
																						advancePayment: undefined,
																						prdAndPrototye: undefined,
																						developmentCompletion: undefined,
																						qaAndFinalDeployment: undefined,
																					})
																				}
																			>
																				<AddIcon />
																			</IconButton>
																		</Grid>
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.advancePayment &&
																							Boolean(
																								errors.phases?.[index]
																									.paymentBreakdown?.[
																									paymentIndex
																								].advancePayment,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.advancePayment &&
																							errors.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							].advancePayment
																						}
																						InputProps={{
																							inputProps: { min: 0 },
																						}}
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.prdAndPrototye &&
																							Boolean(
																								errors.phases?.[index]
																									.paymentBreakdown?.[
																									paymentIndex
																								].prdAndPrototye,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.prdAndPrototye &&
																							errors.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							].prdAndPrototye
																						}
																						InputProps={{
																							inputProps: { min: 0 },
																						}}
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.developmentCompletion &&
																							Boolean(
																								errors.phases?.[index]
																									.paymentBreakdown?.[
																									paymentIndex
																								].developmentCompletion,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.developmentCompletion &&
																							errors.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							].developmentCompletion
																						}
																						InputProps={{
																							inputProps: { min: 0 },
																						}}
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.qaAndFinalDeployment &&
																							Boolean(
																								errors.phases?.[index]
																									.paymentBreakdown?.[
																									paymentIndex
																								].qaAndFinalDeployment,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							]?.qaAndFinalDeployment &&
																							errors.phases?.[index]
																								.paymentBreakdown?.[
																								paymentIndex
																							].qaAndFinalDeployment
																						}
																						InputProps={{
																							inputProps: { min: 0 },
																						}}
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
														{({ push, remove }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={10} item>
																		<h4>Resources</h4>
																	</Grid>
																	<Grid
																		container
																		item
																		xs={2}
																		justifyContent="flex-end"
																	>
																		<Grid item>
																			<IconButton
																				onClick={() =>
																					remove({
																						resourceType: "",
																						quantity: undefined,
																						involvement: "",
																						rate: undefined,
																					})
																				}
																			>
																				<RemoveIcon />
																			</IconButton>
																		</Grid>
																		<Grid item>
																			<IconButton
																				onClick={() =>
																					push({
																						resourceType: "",
																						quantity: undefined,
																						involvement: "",
																						rate: undefined,
																					})
																				}
																			>
																				<AddIcon />
																			</IconButton>
																		</Grid>
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.resourceType &&
																							Boolean(
																								errors.phases?.[index]
																									.resources?.[resourceIndex]
																									.resourceType,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.resourceType &&
																							errors.phases?.[index]
																								.resources?.[resourceIndex]
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.quantity &&
																							Boolean(
																								errors.phases?.[index]
																									.resources?.[resourceIndex]
																									.quantity,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.quantity &&
																							errors.phases?.[index]
																								.resources?.[resourceIndex]
																								.quantity
																						}
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
																						value={
																							phase.resources[resourceIndex]
																								.involvement
																						}
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.involvement &&
																							Boolean(
																								errors.phases?.[index]
																									.resources?.[resourceIndex]
																									.involvement,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.involvement &&
																							errors.phases?.[index]
																								.resources?.[resourceIndex]
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
																						onBlur={handleBlur}
																						error={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.rate &&
																							Boolean(
																								errors.phases?.[index]
																									.resources?.[resourceIndex]
																									.rate,
																							)
																						}
																						helperText={
																							touched?.phases?.[index]
																								.resources?.[resourceIndex]
																								?.rate &&
																							errors.phases?.[index]
																								.resources?.[resourceIndex].rate
																						}
																						InputProps={{
																							inputProps: { min: 0 },
																						}}
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
														{({ push, remove }) => (
															<>
																<Grid container item alignItems="flex-end">
																	<Grid xs={10} item>
																		<h4>Weeks</h4>
																	</Grid>
																	<Grid
																		container
																		item
																		xs={2}
																		justifyContent="flex-end"
																	>
																		<Grid item>
																			<IconButton
																				onClick={() =>
																					remove({
																						weekNumber: "",
																						resources: "",
																					})
																				}
																			>
																				<RemoveIcon />
																			</IconButton>
																		</Grid>
																		<Grid item>
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
																					onBlur={handleBlur}
																					error={
																						touched?.phases?.[index].weeks?.[
																							weekIndex
																						]?.weekNumber &&
																						Boolean(
																							errors.phases?.[index].weeks?.[
																								weekIndex
																							].weekNumber,
																						)
																					}
																					helperText={
																						touched?.phases?.[index].weeks?.[
																							weekIndex
																						]?.weekNumber &&
																						errors.phases?.[index].weeks?.[
																							weekIndex
																						].weekNumber
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
																					onBlur={handleBlur}
																					error={
																						touched?.phases?.[index].weeks?.[
																							weekIndex
																						]?.resources &&
																						Boolean(
																							errors.phases?.[index].weeks?.[
																								weekIndex
																							].resources,
																						)
																					}
																					helperText={
																						touched?.phases?.[index].weeks?.[
																							weekIndex
																						]?.resources &&
																						errors.phases?.[index].weeks?.[
																							weekIndex
																						].resources
																					}
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
															onBlur={handleBlur}
															error={
																touched?.phases?.[index]?.totalPrice &&
																Boolean(errors.phases?.[index].totalPrice)
															}
															helperText={
																touched?.phases?.[index]?.totalPrice &&
																errors.phases?.[index].totalPrice
															}
															InputProps={{ inputProps: { min: 0 } }}
														/>
													</Grid>
												</div>
											))}
										</>
									)}
								</FieldArray>
							</Grid>
							<Grid container item justifyContent="center">
								<Grid item>
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
						</Grid>
					</form>
				)}
			</Formik>
		</Container>
	);
};

export default DesignApproachForm;
