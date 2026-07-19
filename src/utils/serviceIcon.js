import { getGradientByHash } from "./palette";

export function getServiceIconGradient(serviceName) {
  return getGradientByHash(serviceName);
}
