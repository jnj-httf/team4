import get from 'lodash/get';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the languageToggle state domain
 */
const selectLanguage = state => get(state, 'language', initialState);

/**
 * Select the language locale
 */

const makeSelectLocale = () =>
  createSelector(selectLanguage, languageState => languageState.locale);

export { selectLanguage, makeSelectLocale };
