import { insertPermissions } from "../../../uac/migrations/util";
import { database } from "../../../core/database";
import { IMigration } from "../../../core/database.d";

const db = database();

export const init:IMigration = {
    down: () => db.schema
        .dropTableIfExists("brokerages"),
    up: () => db.schema
        .createTable("brokerages", (table) => {
            table.bigIncrements();
            table.string("name").unique();
            table.string("urlTemplate").unique();
        }),
    priority: 0,
    initData: () => insertPermissions(db, [
        { name: "brokerage.view", description: "View brokerages" },
        { name: "brokerage.create", description: "Create brokerages" },
        { name: "brokerage.update", description: "Update brokerages" },
        { name: "brokerage.delete", description: "Delete brokerages" },
    ]),
};
