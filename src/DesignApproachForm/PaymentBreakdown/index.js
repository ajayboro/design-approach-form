import React from "react";

import { Grid, TextField, IconButton, Tooltip } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { FieldArray } from "formik";

const PaymentBreakdown = React.memo(({ index, phase, handleChange }) => {
	const paymentBreakdown = {
		advancePayment: 0,
		prdAndPrototye: 0,
		developmentCompletion: 0,
		qaAndFinalDeployment: 0,
	};
	return (
		<FieldArray name={`phases.${index}.paymentBreakdown`}>
			{({ push, pop }) => (
				<React.Fragment>
					<Grid container item alignItems="flex-end">
						<Grid xs={12} item>
							<h4>Payment breakdown</h4>
						</Grid>
					</Grid>
					{phase.paymentBreakdown.length > 0 &&
						phase.paymentBreakdown.map((payment, paymentIndex) => (
							<div key={paymentIndex}>
								<Grid container item alignItems="flex-end">
									<Grid xs={12} item>
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
												phase.paymentBreakdown[paymentIndex].advancePayment
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
												phase.paymentBreakdown[paymentIndex].prdAndPrototye
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
												phase.paymentBreakdown[paymentIndex]
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
											id={`phases.${index}.paymentBreakdown.${paymentIndex}.qaAndFinalDeployment`}
											name={`phases.${index}.paymentBreakdown.${paymentIndex}.qaAndFinalDeployment`}
											label="QA and final deployment"
											variant="outlined"
											onChange={handleChange}
											value={
												phase.paymentBreakdown[paymentIndex]
													.qaAndFinalDeployment
											}
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
							{phase.paymentBreakdown.length > 0 && (
								<Tooltip title="Delete">
									<IconButton onClick={() => pop()}>
										<DeleteIcon />
									</IconButton>
								</Tooltip>
							)}
						</Grid>
						<Grid item>
							<Tooltip title="Add">
								<IconButton onClick={() => push(paymentBreakdown)}>
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
export default PaymentBreakdown;
