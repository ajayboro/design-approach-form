import { atom } from "recoil";
import ProposalSchema from "../schemas/ProposalSchema/index";

export const proposalSchemaState = atom({
	key: "proposalSchemaState",
	default: ProposalSchema,
});
