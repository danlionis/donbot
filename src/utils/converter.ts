export function millisToTime(uptime: number) {
  // convert mills in sec
  uptime = uptime / 1000;

  const d: number = Math.floor(uptime / 86400);
  uptime = uptime % 86400;
  let h: number | string = Math.floor(uptime / 3600);
  uptime = uptime % 3600;
  let m: number | string = Math.floor(uptime / 60);
  uptime = uptime % 60;
  let s: number | string = Math.floor(uptime);

  if (h < 10) {
    h = "0" + h;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (s < 10) {
    s = "0" + s;
  }

  return `${d}d ${h}h ${m}m ${s}s`;
}
