import { users, sessions } from "@/drizzle/schema";
import { InferInsertModel } from "drizzle-orm";

type User = InferInsertModel<typeof users>;
type Session = InferInsertModel<typeof sessions>;