import { FormattedMessage } from "react-intl";
// serves as a wrapper for the FormattedMessage component
export const t = (id: string) => <FormattedMessage id={id} />;
export default t;
