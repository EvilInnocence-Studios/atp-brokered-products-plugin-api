import { database } from "../../core/database";
import { CheckPermissions } from "../../uac/permission/util"; 
import { Brokerage } from "./service";
import { getBody, getParam } from "../../core/express/extractors";
import { pipeTo } from "ts-functional";
import { IBrokerage, NewBrokerage } from "src/brokered-products-plugin-shared/brokerage/types";
import { HandlerArgs } from "../../core/express/types";

const db = database();

class BrokerageHandlerClass {
    @CheckPermissions("brokerage.view")
    public search( ...args: any[]): Promise<any> {
        return Brokerage.search(...args);
    }

    @CheckPermissions("brokerage.create")
    public create( ...args: HandlerArgs<NewBrokerage>): Promise<IBrokerage> {
        return Brokerage.create(getBody(args));
    }

    @CheckPermissions("brokerage.update")
    public update( ...args: HandlerArgs<Partial<IBrokerage>>): Promise<IBrokerage> {
        return pipeTo(Brokerage.update, getParam("brokerageId"), getBody)(args);
    }

    @CheckPermissions("brokerage.view")
    public get( ...args: HandlerArgs<any>): Promise<IBrokerage> {
        return pipeTo(Brokerage.loadById, getParam("brokerageId"))(args);
    }

    @CheckPermissions("brokerage.delete")
    public remove( ...args: HandlerArgs<undefined>): Promise<null> {
        return pipeTo(Brokerage.remove, getParam("brokerageId"))(args);
    }
}

export const BrokerageHandlers = new BrokerageHandlerClass();