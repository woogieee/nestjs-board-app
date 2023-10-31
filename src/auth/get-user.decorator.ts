import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

//토큰으로 유저정보 가져오기
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    //auth.controller.ts에 @UseGuards(AuthGuard())가 사용된다는 조건하에 작동함
    return req.user;
  }
);
