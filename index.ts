import { FieldRegistry } from "@core/express/util";
import { init } from "../brokered-products-plugin/migrations";

export {apiConfig} from "./endpoints";

export const migrations = [init];
export const setupMigrations = [init];

FieldRegistry.register("brokerages", {
    create: ["name", "urlTemplate"],
    update: ["name", "urlTemplate"],
});
FieldRegistry.register("products", {
    create: ["brokeredAt", "brokerageProductId"],
    update: ["brokeredAt", "brokerageProductId"],
});
