import { ISessionStateErrors, IValidationErrorIssue } from '@src/store/session/types';

export default function simplifyErrors(issues: IValidationErrorIssue[] = []): ISessionStateErrors {
  const result = {} as ISessionStateErrors;
  for (const issue of issues) {
    const key = issue.path.join('.') || 'other';
    if (result[key]) {
      result[key].push(issue.message);
    } else {
      result[key] = [issue.message];
    }
  }
  return result;
}
