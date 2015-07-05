'use strict';

export function imageError(source) {
  source.currentTarget.src = 'public/user.jpg';
  source.currentTarget.onerror = '';
}
