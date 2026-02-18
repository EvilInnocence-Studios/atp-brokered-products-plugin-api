import { database } from "../../core/database";
import { IMigration } from "../../core/dbMigrations";
import { insertPermissions, insertRolePermissions } from "../../uac/migrations/util";

const db = database();

export const init:IMigration = {
    name: "init",
    module: "brokered-products-plugin",
    description: "Initialize the brokerages products plugin",
    version: "1.0.0",
    order: 3,
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

    initData: async () => {
        await insertPermissions(db, [
            { name: "brokerage.view", description: "View brokerages" },
            { name: "brokerage.create", description: "Create brokerages" },
            { name: "brokerage.update", description: "Update brokerages" },
            { name: "brokerage.delete", description: "Delete brokerages" },
        ]);
        await insertRolePermissions(db, [
            { roleName: "SuperUser", permissionName: "brokerage.view" },
            { roleName: "SuperUser", permissionName: "brokerage.create" },
            { roleName: "SuperUser", permissionName: "brokerage.update" },
            { roleName: "SuperUser", permissionName: "brokerage.delete" },
            { roleName: "Public", permissionName: "brokerage.view" },
            { roleName: "Customer", permissionName: "brokerage.view" },
        ]);
    }
}
