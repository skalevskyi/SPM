/**
 * Builds the contact form message body from calculator selection (UI-only; not sent to API schema).
 */

import type { Locale, TranslationKeys } from '@/i18n/types';

import type { AddonId, CalculatorResultOk, DisplayMode, DurationMonths, PackageId } from './calculator/types';

export type CalculatorContactPrefillPayload = {
  packageId: PackageId;
  displayMode: DisplayMode;
  durationMonths: DurationMonths;
  activeAddonIds: AddonId[];
  totalPriceEur: number;
};

export function buildCalculatorContactPayload(
  result: CalculatorResultOk,
  displayMode: DisplayMode,
  packageId: PackageId,
  durationMonths: DurationMonths,
): CalculatorContactPrefillPayload {
  const totalPriceEur =
    displayMode === 'monthly'
      ? result.monthlyView.fromMonth2TotalEur
      : result.contractTotalView.contractTotalEur;
  const activeAddonIds = result.addOnEligibility.filter((a) => a.active).map((a) => a.addonId);
  return {
    packageId,
    displayMode,
    durationMonths,
    activeAddonIds,
    totalPriceEur,
  };
}

function packageLabel(t: TranslationKeys, packageId: PackageId): string {
  switch (packageId) {
    case 'BASIC':
      return t.offres.rear;
    case 'PRO':
      return t.offres.side;
    case 'EXCLUSIVE':
      return t.offres.full;
    default:
      return packageId;
  }
}

function billingLabel(t: TranslationKeys, displayMode: DisplayMode): string {
  return displayMode === 'monthly'
    ? t.offres.calculatorModeMonthly
    : t.offres.calculatorModeContractTotal;
}

function durationLabel(t: TranslationKeys, months: DurationMonths, locale: Locale): string {
  if (locale === 'en') {
    return `${months} ${t.offres.calculatorDurationUnit}`;
  }
  return t.offres.calculatorDurationChip.replace('{n}', String(months));
}

function addonLabel(t: TranslationKeys, id: AddonId): string {
  switch (id) {
    case 'extra_route_day':
      return t.offres.calculatorAddonWeekendExposure;
    case 'photo_reporting':
      return t.offres.calculatorAddonPhotoReporting;
    case 'video_reporting':
      return t.offres.calculatorAddonVideoReporting;
    case 'exclusivity':
      return t.offres.calculatorAddonExclusivity;
    case 'priority_booking':
      return t.offres.calculatorOneTimeFeesLabel;
    default:
      return '';
  }
}

function formatTotalEur(eur: number): string {
  return `€${Math.round(eur)}`;
}

export function buildContactPrefillMessage(
  t: TranslationKeys,
  payload: CalculatorContactPrefillPayload,
  locale: Locale,
): string {
  const pkg = packageLabel(t, payload.packageId);
  const billing = billingLabel(t, payload.displayMode);
  const duration = durationLabel(t, payload.durationMonths, locale);
  const total = formatTotalEur(payload.totalPriceEur);

  const labels = payload.activeAddonIds.map((id) => addonLabel(t, id)).filter(Boolean);
  const addons =
    labels.length === 0
      ? t.contact.prefillNoAddons
      : labels.map((line) => `- ${line}`).join('\n');

  return t.contact.prefillMessageTemplate
    .replace('{package}', pkg)
    .replace('{billing}', billing)
    .replace('{duration}', duration)
    .replace('{addons}', addons)
    .replace('{total}', total);
}
