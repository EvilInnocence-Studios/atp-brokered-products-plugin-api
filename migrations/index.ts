import { database } from "../../core/database";
import { IMigration } from "../../core/dbMigrations";
import { insertPermissions } from "../../uac/migrations/util";

const db = database();

export const migrations:IMigration[] = [{
    name: "init",
    module: "brokered-products-plugin",
    description: "Initialize the brokerages products plugin",
    order: 0,
    down: () => db.schema
        .dropTableIfExists("brokerages")
        .alterTable("products", (t) => {
            t.dropColumn("brokeredAt");
            t.dropColumn("brokerageProductId");
        }),

    up: () => db.schema
        .createTable("brokerages", (table) => {
            table.bigIncrements();
            table.string("name").unique();
            table.string("urlTemplate").unique()
        })
        .alterTable("products", (t) => {
            t.string("brokeredAt", 255);
            t.string("brokerageProductId", 255);
        }),
        
    initData: () => insertPermissions(db, [
        { name: "brokerage.view", description: "View brokerages" },
        { name: "brokerage.create", description: "Create brokerages" },
        { name: "brokerage.update", description: "Update brokerages" },
        { name: "brokerage.delete", description: "Delete brokerages" },
    ]),
}];
