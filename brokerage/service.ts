import { basicCrudService } from "../../core/express/service/common";
import { IBrokerage } from "src/brokered-products-plugin-shared/brokerage/types";

export const Brokerage = {
    ...basicCrudService<IBrokerage>("brokerages"),
}