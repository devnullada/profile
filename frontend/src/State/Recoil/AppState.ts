import { atom } from 'recoil';

export const bodyHeaderViewportState = atom<DOMRect>({
  key: 'bodyHeaderViewportState',
  default: new DOMRect(),
});
