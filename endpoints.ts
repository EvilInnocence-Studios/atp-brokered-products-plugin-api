import { IApiConfig } from "../core/endpoints";
import { BrokerageEndpoints } from "./brokerage/endpoints";

export const apiConfig:IApiConfig = {
    ...BrokerageEndpoints,
}
