import React, { useState } from "react";

import {
	Grid,
	TextField,
	Container,
	Button,
	IconButton,
	Tooltip,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { Formik, FieldArray } from "formik";

import SubModules from "./SubModules/index";
import Resources from "./Resources/index";
import Weeks from "./Weeks/index";
import { useRecoilState } from "recoil";
import { proposalSchemaState } from "../recoil/atom";

const DesignApproachForm = React.memo(() => {
	const [proposalData, setProposalData] = useRecoilState(proposalSchemaState);
	const initialValues = {
		description: proposalData.design_approach.description,
		workflowLink: proposalData.design_approach.workflow_link,
		featureLink: proposalData.design_approach.feature_link,
		phases: [],
	};

	const phases = {
		phaseName: "",
		description: "",
		subModules: [],
		paymentBreakdown: {
			advancePayment: 0,
			prdAndPrototye: 0,
			developmentCompletion: 0,
			qaAndFinalDeployment: 0,
		},
		resources: [],
		weeks: [],
		totalPrice: 0,
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

	return (
		<Container maxWidth="md">
			<Formik
				initialValues={initialValues}
				validateOnChange={false}
				onSubmit={values => {
					console.log(values);
				}}
			>
				{({ values, handleSubmit, handleChange }) => (
					<form onSubmit={handleSubmit} autoComplete="off">
						<Grid container justifyContent="center" alignItems="flex-end">
							<Grid item xs={12}>
								<Grid container item alignItems="flex-end">
									<h1>Design approach</h1>
									<Grid xs={12} item>
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
									{({ push, pop }) => (
										<React.Fragment>
											{values.phases.length > 0 &&
												values.phases.map((phase, index) => (
													<React.Fragment key={index}>
														<Grid xs={12} item>
															<h2>Phases {index + 1}</h2>
														</Grid>
														<Grid container item alignItems="flex-end">
															<Grid xs={12} item>
																<TextField
																	fullWidth
																	margin="normal"
																	type="text"
																	id={`phases.${index}.phaseName`}
																	name={`phases.${index}.phaseName`}
																	label="Phase name"
																	variant="outlined"
																	onChange={handleChange}
																	value={values.phases[index].phaseName}
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
																	value={values.phases[index].description}
																/>
															</Grid>
														</Grid>
														<SubModules
															proposalData={proposalData}
															index={index}
															phase={phase}
															weekNames={weekNames}
															handleChange={handleChange}
														/>

														<React.Fragment>
															<Grid container item alignItems="flex-end">
																<Grid xs={12} item>
																	<h4>Payment breakdown</h4>
																</Grid>
															</Grid>
															<Grid container item alignItems="flex-end">
																<Grid xs={12} item>
																	<TextField
																		fullWidth
																		margin="normal"
																		type="number"
																		id={`phases.${index}.paymentBreakdown.advancePayment`}
																		name={`phases.${index}.paymentBreakdown.advancePayment`}
																		label="Advance Payment"
																		variant="outlined"
																		onChange={handleChange}
																		value={
																			phase.paymentBreakdown.advancePayment
																		}
																		InputProps={{
																			inputProps: { min: 0 },
																		}}
																	/>
																	<TextField
																		fullWidth
																		margin="normal"
																		type="number"
																		id={`phases.${index}.paymentBreakdown.prdAndPrototye`}
																		name={`phases.${index}.paymentBreakdown.prdAndPrototye`}
																		label=" PRD and prototype"
																		variant="outlined"
																		onChange={handleChange}
																		value={
																			phase.paymentBreakdown.prdAndPrototye
																		}
																		InputProps={{
																			inputProps: { min: 0 },
																		}}
																	/>
																	<TextField
																		fullWidth
																		margin="normal"
																		type="number"
																		id={`phases.${index}.paymentBreakdown.developmentCompletion`}
																		name={`phases.${index}.paymentBreakdown.developmentCompletion`}
																		label="Development completion"
																		variant="outlined"
																		onChange={handleChange}
																		value={
																			phase.paymentBreakdown
																				.developmentCompletion
																		}
																		InputProps={{
																			inputProps: { min: 0 },
																		}}
																	/>
																	<TextField
																		fullWidth
																		margin="normal"
																		type="number"
																		id={`phases.${index}.paymentBreakdown.qaAndFinalDeployment`}
																		name={`phases.${index}.paymentBreakdown.qaAndFinalDeployment`}
																		label="QA and final deployment"
																		variant="outlined"
																		onChange={handleChange}
																		value={
																			phase.paymentBreakdown
																				.qaAndFinalDeployment
																		}
																		InputProps={{
																			inputProps: { min: 0 },
																		}}
																	/>
																</Grid>
															</Grid>
														</React.Fragment>
														<Resources
															proposalData={proposalData}
															index={index}
															phase={phase}
															handleChange={handleChange}
														/>
														<Weeks
															proposalData={proposalData}
															index={index}
															phase={phase}
															handleChange={handleChange}
														/>
														<Grid item xs={12}>
															<TextField
																fullWidth
																margin="normal"
																type="number"
																id={`phases.${index}.totalPrice`}
																name={`phases.${index}.totalPrice`}
																label="Total price"
																variant="outlined"
																onChange={handleChange}
																value={values.phases[index].totalPrice}
																InputProps={{ inputProps: { min: 0 } }}
															/>
														</Grid>
													</React.Fragment>
												))}
											<Grid container item xs={12} justifyContent="flex-end">
												<Grid item>
													{values.phases.length > 0 && (
														<Tooltip title="Delete Phases">
															<IconButton onClick={() => pop()}>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
													)}
												</Grid>
												<Grid item>
													<Tooltip title="Add Phases">
														<IconButton onClick={() => push(phases)}>
															<AddIcon />
														</IconButton>
													</Tooltip>
												</Grid>
											</Grid>
										</React.Fragment>
									)}
								</FieldArray>
							</Grid>
							<Grid container justifyContent="center">
								<Grid item xs={12}>
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
});

export default DesignApproachForm;
