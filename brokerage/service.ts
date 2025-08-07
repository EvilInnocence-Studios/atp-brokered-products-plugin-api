import { database } from "@core/database";
import { basicCrudService } from "@core/express/service/common";

const db = database();

export const Brokerage = {
    ...basicCrudService<IBrokerage>("brokerages"),
}