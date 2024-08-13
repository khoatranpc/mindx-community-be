import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlException } from 'src/customs/GraphqlException';
import { Role } from '../enum';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

@Injectable()
export class RolesGuard extends GqlAuthGuard implements CanActivate {
  constructor(private readonly requiredRoles: Role[]) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const isAuthenticated = await super.canActivate(context);

    if (!isAuthenticated) {
      return false;
    }

    const user = request.user;

    if (!user || !this.hasRole(user, this.requiredRoles)) {
      throw new GraphqlException({
        statusCode: 400
      }, 'Permission denied!');
    }

    return true;
  }

  private hasRole(user: any, roles: string[]): boolean {
    return roles.some(role => user.role === role);
  }
}