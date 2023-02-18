import { Request, Response, Express } from "express";
import { Route } from "./Route";

import { personSchema } from "../schemas/personschema";
import { validate } from "../middleware/validation";
import { personUtils } from "../utils/personUtils";

const Routes: Route[] = [
    {
        path: "/",
        method: "get",
        handler: [(_req: Request, res: Response) => {
            res.send("Hello World!");
        }]
    },
    {
        // receive a request with a body that has a Person Schema (name and age property)
        path: "/hello",
        method: "get",
        handler: [
            validate(personSchema),
            (req: Request, res: Response) => {
                res.send(hello(req.query as unknown as { name: string, age?: number }));
            }
        ]
    }

];

function hello(person: { name: string, age?: number }) {
    return personUtils(person)
}

export const injectRoutes = (app: Express) => {
    Routes.forEach((route: Route) => {
        const { method, path, handler } = route;
        app[method](path, ...handler);
    });
}