import { getPackageInfo } from '../bridge';

const levels = {
  loading: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="16" rx="2" fill="#190E5A"/>
  <path d="M14 8C14 8.83197 13.7924 9.6508 13.396 10.3823C12.9996 11.1137 12.4269 11.7347 11.7299 12.189C11.0329 12.6432 10.2335 12.9164 9.40428 12.9836C8.57503 13.0509 7.7421 12.9102 6.98097 12.5742C6.21984 12.2383 5.55458 11.7177 5.04546 11.0597C4.53635 10.4017 4.19948 9.62701 4.06538 8.80591C3.93128 7.98481 4.00419 7.14323 4.2775 6.35743C4.55082 5.57163 5.0159 4.86645 5.63059 4.3058L6.30447 5.04464C5.81272 5.49316 5.44066 6.05731 5.222 6.68595C5.00335 7.31459 4.94502 7.98785 5.0523 8.64473C5.15958 9.3016 5.42908 9.92133 5.83637 10.4477C6.24366 10.9742 6.77587 11.3906 7.38478 11.6594C7.99368 11.9281 8.66002 12.0407 9.32342 11.9869C9.98682 11.9331 10.6263 11.7146 11.1839 11.3512C11.7416 10.9878 12.1997 10.491 12.5168 9.90582C12.8339 9.32064 13 8.66558 13 8H14Z" fill="white"/>
  </svg>`,
  bad: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="16" rx="2" fill="#E53935"/>
  <path d="M4.25986 13H13.7401C14.7096 13 15.3139 12.0181 14.8292 11.2361L10.089 3.58651C9.60432 2.8045 8.39568 2.8045 7.91096 3.58651L3.17083 11.2361C2.68611 12.0181 3.29043 13 4.25986 13ZM9 8.88417C8.65378 8.88417 8.3705 8.61958 8.3705 8.29619V7.12024C8.3705 6.79685 8.65378 6.53227 9 6.53227C9.34623 6.53227 9.6295 6.79685 9.6295 7.12024V8.29619C9.6295 8.61958 9.34623 8.88417 9 8.88417ZM9.6295 11.2361H8.3705V10.0601H9.6295V11.2361Z" fill="white"/>
  </svg>`,
  good: `<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="18" height="16" rx="2" fill="#69F597"/>
  <path d="M11 3.33333L9 2L7.66667 2.66667L7.14478 3.33333L5 4L4.33333 6L3.66667 6.66667L3 8L3.66667 9.33333L4.33333 10V11.3333L5 12L6.33333 12.6667L7.66667 13.3333L9 14L10.8881 12.6667H12.3333L13 12L13.8945 9.33333L14.5 8V7.5L13.6667 6.27874L13 4L11 3.33333Z" fill="white"/>
  <path d="M11.6245 6.84191C11.7773 6.6891 11.7773 6.44134 11.6245 6.28852C11.4717 6.13571 11.2239 6.13571 11.0711 6.28852L8.21739 9.14226L6.92887 7.85374C6.77605 7.70093 6.52829 7.70093 6.37548 7.85374C6.22267 8.00656 6.22267 8.25431 6.37548 8.40713L7.9407 9.97235C8.09351 10.1252 8.34127 10.1252 8.49409 9.97235L11.6245 6.84191Z" fill="#69F597"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.1144 2.36515C9.45124 1.87828 8.54876 1.87828 7.88556 2.36515L7.168 2.89194C7.02502 2.9969 6.8588 3.06576 6.68348 3.09263L5.80359 3.22753C4.99037 3.35221 4.35221 3.99037 4.22753 4.80359L4.09263 5.68348C4.06576 5.8588 3.9969 6.02502 3.89194 6.168L3.36515 6.88556C2.87828 7.54876 2.87828 8.45124 3.36515 9.11444L3.89194 9.832C3.9969 9.97498 4.06576 10.1412 4.09263 10.3165L4.22753 11.1964C4.35221 12.0096 4.99037 12.6478 5.80359 12.7725L6.68348 12.9074C6.8588 12.9342 7.02502 13.0031 7.168 13.1081L7.88556 13.6348C8.54876 14.1217 9.45124 14.1217 10.1144 13.6348L10.832 13.1081C10.975 13.0031 11.1412 12.9342 11.3165 12.9074L12.1964 12.7725C13.0096 12.6478 13.6478 12.0096 13.7725 11.1964L13.9074 10.3165C13.9342 10.1412 14.0031 9.97498 14.1081 9.832L14.6348 9.11444C15.1217 8.45124 15.1217 7.54876 14.6348 6.88556L14.1081 6.168C14.0031 6.02502 13.9342 5.8588 13.9074 5.68348L13.7725 4.80359C13.6478 3.99037 13.0096 3.35221 12.1964 3.22753L11.3165 3.09263C11.1412 3.06576 10.975 2.9969 10.832 2.89194L10.1144 2.36515ZM8.34869 2.99601C8.73628 2.71147 9.26372 2.71147 9.65131 2.99601L10.3689 3.5228C10.6135 3.7024 10.8979 3.82021 11.1979 3.8662L12.0778 4.0011C12.5531 4.07397 12.926 4.44692 12.9989 4.92219L13.1338 5.80208C13.1798 6.10206 13.2976 6.38649 13.4772 6.63113L14.004 7.34869C14.2885 7.73628 14.2885 8.26372 14.004 8.65131L13.4772 9.36887C13.2976 9.61351 13.1798 9.89794 13.1338 10.1979L12.9989 11.0778C12.926 11.5531 12.5531 11.926 12.0778 11.9989L11.1979 12.1338C10.8979 12.1798 10.6135 12.2976 10.3689 12.4772L9.65131 13.004C9.26372 13.2885 8.73628 13.2885 8.34869 13.004L7.63113 12.4772C7.38649 12.2976 7.10206 12.1798 6.80208 12.1338L5.92219 11.9989C5.44692 11.926 5.07397 11.5531 5.0011 11.0778L4.8662 10.1979C4.82021 9.89794 4.7024 9.61351 4.5228 9.36887L3.99601 8.65131C3.71147 8.26372 3.71147 7.73628 3.99601 7.34869L4.5228 6.63113C4.7024 6.38649 4.82021 6.10206 4.8662 5.80208L5.0011 4.92219C5.07397 4.44692 5.44692 4.07397 5.92219 4.0011L6.80208 3.8662C7.10206 3.82021 7.38649 3.7024 7.63113 3.5228L8.34869 2.99601Z" fill="#69F597"/>
  </svg>`,
};

const indicatorStatus = (advisories) => {
  if (advisories === null || advisories === undefined) return 'loading';

  const isBad = Object.values(advisories)
    .filter((adv) => adv)
    .some(({ isBad }) => isBad);
  if (isBad) return 'bad';

  return 'good';
};

const surroundContents = (range, newParent) => {
  newParent.appendChild(range.extractContents());
  range.insertNode(newParent);
};

export const addIndicator = async ({ range, ...packageID }) => {
  console.debug('Adding indicator for', packageID);

  const indicator = document.createElement('span');
  indicator.innerHTML = levels.loading;
  range.insertNode(indicator);

  const indicatorContainer = document.createElement('span');
  indicatorContainer.classList.add('indicator-container', 'indicator-loading');
  surroundContents(range, indicatorContainer);

  const info = await getPackageInfo(packageID);
  if (!info) {
    console.error(`Didn't received info`, range, packageID);
    return;
  }

  const level = indicatorStatus(info);
  console.debug(`level: ${level}`, info);
  indicator.innerHTML = levels[level];
  indicatorContainer?.classList.replace('indicator-loading', `indicator-${level}`);
};