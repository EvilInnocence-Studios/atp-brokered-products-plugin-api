import { init } from "../brokered-products-plugin/migrations";

export {apiConfig} from "./endpoints";

export const migrations = [init];
export const setupMigrations = [init];
