import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const durationFormat = (unix = 0, unit = 'seconds') => {
  const durationUnit = dayjs.duration(unix, unit);
  let years = durationUnit.years();
  let months = durationUnit.months();
  let days = durationUnit.days();
  let hours = durationUnit.hours();
  let minutes = durationUnit.minutes();
  let seconds = durationUnit.seconds();

  let text =
    `${years ? years + '年' : ''}` +
    `${months ? months + '个月' : ''}` +
    `${days ? days + '天' : ''}` +
    `${hours ? hours + '时' : ''}` +
    `${minutes ? minutes + '分' : ''}` +
    `${seconds ? seconds + '秒' : ''}`;

  return {
    months,
    days,
    hours,
    minutes,
    seconds,
    text: text || '0秒',
  };
};

export const diffFormat = (
  unix = 0,
  unit = 'seconds',
  format = 'YY[年]MM[个月]DD[天]HH[时]mm[分]ss[秒]',
) => {
  return dayjs.duration(unix, unit).format(format);
};
