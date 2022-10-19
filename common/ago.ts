import { intl } from "./intl";

const MOREDAY = 1000 * 60 * 60 * 24;
const MOREHOUR = 1000 * 60 * 60;
const MOREMINUTE = 60000;

const ago = (timestamp: number, locale?: string): string => {
  let milliSeconds = timestamp * 1000;
  let msecondsDiff = Date.now() - milliSeconds;

  if (msecondsDiff >= MOREDAY) {
    return `${Math.floor(msecondsDiff / 1000 / 60 / 60 / 24)} ${intl(locale).formatMessage({
      id: "days-ago",
      defaultMessage: "days ago"
    })}`;
  } else if (msecondsDiff >= MOREHOUR) {
    return `${Math.floor(msecondsDiff / 1000 / 60 / 60)} ${intl(locale).formatMessage({
      id: "hours-ago",
      defaultMessage: "hours ago"
    })}`;
  } else if (msecondsDiff >= MOREMINUTE) {
    return `${Math.floor(msecondsDiff / 1000 / 60)} ${intl(locale).formatMessage({
      id: "minutes-ago",
      defaultMessage: "minutes ago"
    })}`;
  } else {
    return intl(locale).formatMessage({
      id: "just-now",
      defaultMessage: "just now"
    });
  }
};

export default ago;
