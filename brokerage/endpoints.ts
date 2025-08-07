import { get, post, patch, del } from "../../core/express/wrappers"
import { BrokerageHandlers } from "./handlers"

export const BrokerageEndpoints = {
    brokerage: {
        GET: get(BrokerageHandlers.search),
        POST: post(BrokerageHandlers.create),
        ":brokerageId": {
            GET: get(BrokerageHandlers.get),
            PATCH: patch(BrokerageHandlers.update),
            DELETE: del(BrokerageHandlers.remove),
        }
    }
}