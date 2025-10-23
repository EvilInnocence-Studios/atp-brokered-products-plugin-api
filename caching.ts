import { IBehavior } from "../core/cloudfront";

export const brokerageCaching:IBehavior[] = [
    {precedence: 1, pathPattern: "/brokerage*", cache: true },
];