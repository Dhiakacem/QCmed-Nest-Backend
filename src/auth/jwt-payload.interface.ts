export interface JwtPayload {
  mail: string; // 'mail' field, not 'email'
  sub: string; // 'sub' is typically the user id or a unique identifier
}
