import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((_data, ctx:ExecutionContext): User =>{
    const reqBody = ctx.switchToHttp().getRequest();
    return reqBody.user;
})