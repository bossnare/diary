import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

const timeAgo = (date: string) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: enUS,
  });

  // mamadika ho fohy
  // const shortTime = timeAgo
  //   .replace('minute', 'min')
  //   .replace('mins', 'min')
  //   .replace('heure', 'h')
  //   // .replace('hs', 'h')
  //   .replace('jour', 'jr')
  //   .replace('jours', 'jrs')
  //   .replace('il y a moins d’une min', 'Tout juste')
  //   .replace('environ', '')
  //   .replace('il y a', '')
  //   .replace("dans moins d'une min", 'Tout juste');

  // return shortTime;
};

export default timeAgo;
