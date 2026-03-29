'use client';

import type { ReactNode } from 'react';
import { Camera, CheckCircle2, Eye, Play, Shield } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { InfoIconTooltip } from '@/components/ui/Tooltip';
import { useLanguage } from '@/context/LanguageContext';
import { ADDON_PRICES, BASE_MONTHLY_MEDIA_EUR } from '@/lib/calculator/config';
import type { AddonEligibility } from '@/lib/calculator/types';
import type { AddonId, CalculatorResult, DisplayMode, DurationMonths, PackageId } from '@/lib/calculator/types';

const focusRing =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-500/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-sky-400/50 dark:focus-visible:ring-offset-slate-900';

/** Right-panel section labels (i18n strings; styling only). */
const summarySectionHeading =
  'mb-2 font-medium text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400';

/** Hide UI rows when the rounded euro amount is zero (presentation-only). */
function isNonZeroEur(eur: number): boolean {
  return Math.round(eur * 100) !== 0;
}

function prepaidRateForDuration(months: DurationMonths): number {
  switch (months) {
    case 3:
      return 0.02;
    case 6:
      return 0.03;
    case 9:
      return 0.04;
    case 12:
      return 0.05;
    default:
      return 0;
  }
}

type Props = {
  packageId: PackageId;
  durationMonths: DurationMonths;
  setDurationMonths: (m: DurationMonths) => void;
  weekendExposure: boolean;
  setWeekendExposure: (v: boolean) => void;
  photoReporting: boolean;
  setPhotoReporting: (v: boolean) => void;
  videoReporting: boolean;
  setVideoReporting: (v: boolean) => void;
  exclusivity: boolean;
  setExclusivity: (v: boolean) => void;
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  result: CalculatorResult;
  selectedName: string;
  selectedPositioning: string;
  packageDescription: string;
  packageFeatured: boolean;
  formatEur: (value: number) => string;
};

function setAddonState(
  addonId: AddonId,
  next: boolean,
  setters: Pick<Props, 'setWeekendExposure' | 'setPhotoReporting' | 'setVideoReporting' | 'setExclusivity'>,
) {
  if (addonId === 'extra_route_day') setters.setWeekendExposure(next);
  else if (addonId === 'photo_reporting') setters.setPhotoReporting(next);
  else if (addonId === 'video_reporting') setters.setVideoReporting(next);
  else if (addonId === 'exclusivity') setters.setExclusivity(next);
}

function tooltipForAddonId(
  addonId: AddonId,
  t: ReturnType<typeof useLanguage>['t'],
): string {
  switch (addonId) {
    case 'extra_route_day':
      return t.tooltips.weekendExposure;
    case 'photo_reporting':
      return t.tooltips.photo;
    case 'video_reporting':
      return t.tooltips.video;
    case 'exclusivity':
      return t.tooltips.exclusivity;
    default:
      return '';
  }
}

function labelForAddon(addon: AddonEligibility, t: ReturnType<typeof useLanguage>['t']): string {
  switch (addon.addonId) {
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

function formatAddonPriceMo(amount: number, t: ReturnType<typeof useLanguage>['t']): string {
  return t.offres.calculatorAddonPriceFormat.replace('{amount}', String(Math.round(amount)));
}

function addonPillIcon(addonId: AddonId): LucideIcon {
  switch (addonId) {
    case 'extra_route_day':
      return Eye;
    case 'photo_reporting':
      return Camera;
    case 'video_reporting':
      return Play;
    case 'exclusivity':
      return Shield;
    default:
      return Eye;
  }
}

type PaidAddonRowProps = {
  addon: AddonEligibility;
  label: string;
  priceLabel: string;
  tip: string;
  onToggle: () => void;
};

function PaidAddonRow({ addon, label, priceLabel, tip, onToggle }: PaidAddonRowProps) {
  const isActive = addon.active;
  const canToggle = addon.available;
  const { t } = useLanguage();
  const Icon = addonPillIcon(addon.addonId);

  const rowState =
    !canToggle
      ? 'cursor-not-allowed border-slate-200 bg-transparent opacity-70 dark:border-slate-700'
      : isActive
        ? 'cursor-pointer border-sky-500 bg-sky-50 text-slate-900 hover:bg-sky-100/90 dark:border-sky-500 dark:bg-sky-900/20 dark:text-slate-50 dark:hover:bg-sky-900/30'
        : 'cursor-pointer border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700';

  return (
    <div className="flex w-full min-w-0 items-stretch gap-1.5">
      <button
        type="button"
        disabled={!canToggle}
        aria-pressed={canToggle ? isActive : undefined}
        aria-disabled={!canToggle}
        onClick={() => {
          if (!canToggle) return;
          onToggle();
        }}
        className={`flex min-h-10 min-w-0 flex-1 items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors duration-150 ${rowState} ${focusRing}`}
      >
        <Icon
          className={`size-4 shrink-0 stroke-[2] ${
            !canToggle
              ? 'text-slate-400 dark:text-slate-500'
              : isActive
                ? 'text-sky-600 dark:text-sky-400'
                : 'text-slate-500 dark:text-slate-400'
          }`}
          aria-hidden
        />
        <span
          className={`min-w-0 flex-1 leading-snug ${
            canToggle && isActive ? 'text-slate-900 dark:text-slate-50' : 'text-slate-700 dark:text-slate-300'
          }`}
        >
          {label}
        </span>
        {canToggle ? (
          <span
            className={`shrink-0 tabular-nums ${
              isActive ? 'font-semibold text-slate-900 dark:text-slate-50' : 'font-medium text-slate-600 dark:text-slate-400'
            }`}
          >
            {priceLabel}
          </span>
        ) : (
          <span className="shrink-0 text-xs font-medium text-slate-400 dark:text-slate-500">
            {t.offres.calculatorBadgeNotAvailable}
          </span>
        )}
      </button>
      <div
        className={`flex shrink-0 items-center self-center pr-0.5 ${!canToggle ? 'opacity-70' : ''}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <InfoIconTooltip
          content={tip}
          placement="top-right"
          noLeadingMargin
          triggerClassName={
            isActive && canToggle
              ? '!text-sky-600/80 hover:!text-sky-700 dark:!text-sky-400/85 dark:hover:!text-sky-300'
              : '!text-slate-500 hover:!text-slate-700 dark:!text-slate-400 dark:hover:!text-slate-300'
          }
        />
      </div>
    </div>
  );
}

function IncludedPackageBlock({
  addons,
  t,
}: {
  addons: AddonEligibility[];
  t: ReturnType<typeof useLanguage>['t'];
}) {
  if (addons.length === 0) return null;

  return (
    <div className="rounded-xl border border-emerald-200/75 bg-emerald-50/80 px-3 py-2.5 dark:border-emerald-800/55 dark:bg-emerald-950/30">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-900 dark:text-emerald-100">
        <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" strokeWidth={2} aria-hidden />
        {t.offres.calculatorIncludedBlockTitle}
      </p>
      <ul className="mt-2 space-y-2">
        {addons.map((addon) => {
          const ItemIcon = addonPillIcon(addon.addonId);
          return (
            <li key={addon.addonId} className="flex items-start gap-2.5 text-xs leading-snug text-emerald-900/90 dark:text-emerald-50/90">
              <ItemIcon
                className="mt-0.5 size-4 shrink-0 text-emerald-600/95 dark:text-emerald-400/90"
                strokeWidth={2}
                aria-hidden
              />
              <span className="inline-flex min-w-0 flex-wrap items-center gap-0.5">
                <span>{labelForAddon(addon, t)}</span>
                <InfoIconTooltip
                  content={tooltipForAddonId(addon.addonId, t)}
                  placement="top-right"
                  noLeadingMargin
                  triggerClassName="!text-emerald-700/85 hover:!text-emerald-900 dark:!text-emerald-300/90 dark:hover:!text-emerald-200"
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ladderRow(
  label: ReactNode,
  value: ReactNode,
  valueClassName = 'tabular-nums text-sm font-normal text-slate-600/95 dark:text-slate-300/95',
  labelClassName = 'min-w-0 text-left text-sm text-slate-500/80 dark:text-slate-400/85',
) {
  return (
    <div className="flex items-baseline justify-between gap-3 leading-snug">
      <span className={labelClassName}>{label}</span>
      <span className={`shrink-0 text-right ${valueClassName}`}>{value}</span>
    </div>
  );
}

function addonLadderRow(
  addonId: AddonId,
  label: ReactNode,
  value: ReactNode,
  valueClassName: string,
  labelClassName: string,
) {
  const RowIcon = addonPillIcon(addonId);
  return (
    <div className="flex items-baseline justify-between gap-2 leading-snug">
      <span className="flex min-w-0 flex-1 items-baseline gap-2">
        <RowIcon
          className="size-3.5 shrink-0 text-slate-400 dark:text-slate-500"
          strokeWidth={2}
          aria-hidden
        />
        <span className={`min-w-0 ${labelClassName}`}>{label}</span>
      </span>
      <span className={`shrink-0 text-right ${valueClassName}`}>{value}</span>
    </div>
  );
}

export function OfferCalculatorPanel(props: Props) {
  const { t } = useLanguage();
  const {
    packageId,
    durationMonths,
    setDurationMonths,
    displayMode,
    setDisplayMode,
    result,
    selectedName,
    selectedPositioning,
    packageDescription,
    packageFeatured,
    formatEur,
  } = props;

  if (!result.ok) {
    return (
      <div className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-600/80 dark:bg-slate-800/90 md:p-6">
        <div className="border-b border-slate-100 pb-4 dark:border-slate-700/80">
          <h4 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {t.offres.simTitle}
          </h4>
          <p className="mt-1 text-sm leading-snug text-slate-600 dark:text-slate-400">{t.offres.hint}</p>
        </div>
        <div className="mt-5 space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {t.offres.simFormatLabel}
          </p>
          <p className="text-base font-semibold text-slate-900 dark:text-white">{selectedName}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{selectedPositioning}</p>
        </div>
        <p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
          {t.offres.simDisclaimer}
        </p>
        <a
          href="#contact"
          className={`mt-4 block w-full rounded-lg bg-gradient-to-b from-sky-600 to-sky-700 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-[filter] duration-150 hover:brightness-105 dark:from-sky-600 dark:to-sky-800 dark:hover:brightness-110 ${focusRing}`}
        >
          {t.offres.ctaEstimation}
        </a>
      </div>
    );
  }

  const { addOnEligibility, monthlyView, contractTotalView, indicativeMonthlyContacts, durationMultiplier } =
    result;

  const avgMonthlyRounded = Math.round(
    contractTotalView.contractTotalEur / durationMonths,
  );

  const periodDiscountEurOnBase =
    Math.round(BASE_MONTHLY_MEDIA_EUR[packageId] * (1 - durationMultiplier) * 100) / 100;

  const prepaidRate = prepaidRateForDuration(durationMonths);
  const contractTotalEur = contractTotalView.contractTotalEur;
  const prepaidTotalEur = Math.round(contractTotalEur * (1 - prepaidRate) * 100) / 100;
  const prepaidSavingsEur = Math.round((contractTotalEur - prepaidTotalEur) * 100) / 100;

  const getAddon = (id: AddonId) => addOnEligibility.find((a) => a.addonId === id);

  const extraRouteAddon = getAddon('extra_route_day');
  const photoAddon = getAddon('photo_reporting');
  const videoAddon = getAddon('video_reporting');
  const exclusivityAddon = getAddon('exclusivity');

  const includedAddons = addOnEligibility.filter((a) => a.includedByDefinition);

  const paidLineItems = addOnEligibility.filter(
    (a) => (a.chargedMonthlyEur > 0 || a.chargedOneTimeEur > 0) && !a.includedByDefinition,
  );

  const addonsMonthlyTotal = paidLineItems.reduce((sum, a) => sum + a.chargedMonthlyEur, 0);

  const addonsContractTotal = paidLineItems.reduce(
    (sum, a) => sum + a.chargedMonthlyEur * durationMonths + a.chargedOneTimeEur,
    0,
  );

  const hasPaidSelection = paidLineItems.length > 0;

  const extraRoutePillPriceEur = result.selection.extraRouteDays * ADDON_PRICES.extra_route_day.eur;

  const formatPaidAddonLine = (a: AddonEligibility) => {
    if (a.chargedMonthlyEur > 0) return formatAddonPriceMo(a.chargedMonthlyEur, t);
    return `${formatEur(Math.round(a.chargedOneTimeEur))} (${t.offres.calculatorOneTimeFeesLabel})`;
  };

  const renderPaidAddonRow = (addon: AddonEligibility | undefined, priceEur: number) => {
    if (!addon) return null;
    const priceLabel = formatAddonPriceMo(priceEur, t);
    return (
      <PaidAddonRow
        key={addon.addonId}
        addon={addon}
        label={labelForAddon(addon, t)}
        priceLabel={priceLabel}
        tip={tooltipForAddonId(addon.addonId, t)}
        onToggle={() => setAddonState(addon.addonId, !addon.active, props)}
      />
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-600/80 dark:bg-slate-800/90 md:p-6">
      <div className="border-b border-slate-100 pb-4 dark:border-slate-700/80">
        <h4 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {t.offres.simTitle}
        </h4>
        <p className="mt-1 text-sm leading-snug text-slate-600 dark:text-slate-400">{t.offres.hint}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-8">
        <div className="flex min-h-0 min-w-0 flex-col gap-4">
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t.offres.simFormatLabel}
              </p>
              <p className="mt-0.5 text-base font-semibold text-slate-900 dark:text-white">
                {selectedName}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {selectedPositioning}
              </p>
              {packageFeatured ? (
                <span className="mt-2 inline-block rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 dark:border-sky-800/60 dark:bg-sky-900/40 dark:text-sky-300">
                  {t.offres.badgeFeatured}
                </span>
              ) : null}
            </div>
            {packageDescription ? (
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                {packageDescription}
              </p>
            ) : null}
            <div className="mt-4 border-t border-slate-200/80 pt-3 dark:border-slate-600/60">
              <p className="text-base font-medium tabular-nums tracking-tight text-slate-600 dark:text-slate-300">
                {indicativeMonthlyContacts.toLocaleString()}
              </p>
              <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                {t.offres.calculatorContactsLabel}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/90 bg-white p-4 dark:border-slate-700/65 dark:bg-slate-900/35">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.offres.simDuration}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([3, 6, 9, 12] as const).map((m) => {
                const isActive = durationMonths === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDurationMonths(m)}
                    className={`min-h-9 rounded-md border px-2 py-1.5 text-center text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'border-sky-500 bg-sky-50 text-slate-900 hover:bg-sky-50/90 dark:border-sky-500/80 dark:bg-sky-950/40 dark:text-white dark:hover:bg-sky-950/55'
                        : 'border-slate-200 bg-slate-50/80 text-slate-700 hover:border-slate-300 hover:bg-slate-100/80 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800/70'
                    } ${focusRing}`}
                  >
                    {t.offres.calculatorDurationChip.replace('{n}', String(m))}
                  </button>
                );
              })}
            </div>
          </div>

          <IncludedPackageBlock addons={includedAddons} t={t} />

          <div className="rounded-xl border border-slate-200/85 bg-slate-50/50 p-3 dark:border-slate-700/60 dark:bg-slate-900/30">
            <p className="mb-3 font-medium text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.offres.calculatorAddonsTitle}
            </p>
            <div className="flex flex-col gap-2">
              {packageId === 'EXCLUSIVE' ? (
                <>
                  {extraRouteAddon ? renderPaidAddonRow(extraRouteAddon, extraRoutePillPriceEur) : null}
                  {videoAddon ? renderPaidAddonRow(videoAddon, ADDON_PRICES.video_reporting.eur) : null}
                </>
              ) : (
                <>
                  {extraRouteAddon ? renderPaidAddonRow(extraRouteAddon, extraRoutePillPriceEur) : null}
                  {packageId === 'BASIC' && photoAddon
                    ? renderPaidAddonRow(photoAddon, ADDON_PRICES.photo_reporting.eur)
                    : null}
                  {packageId === 'PRO' && videoAddon
                    ? renderPaidAddonRow(videoAddon, ADDON_PRICES.video_reporting.eur)
                    : null}
                  {exclusivityAddon ? renderPaidAddonRow(exclusivityAddon, ADDON_PRICES.exclusivity.eur) : null}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex h-full min-h-0 min-w-0 flex-col gap-3 rounded-xl border border-slate-200/95 bg-gradient-to-b from-slate-50 via-white to-slate-50/90 p-4 shadow-sm dark:border-slate-600/90 dark:bg-gradient-to-b dark:from-slate-950/90 dark:via-slate-900/85 dark:to-slate-950/80 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] md:min-h-[28rem]">
          <div
            className="flex max-w-full min-h-8 flex-shrink-0 flex-wrap items-center gap-0.5 rounded-lg border border-slate-200/80 bg-slate-100/80 p-0.5 dark:border-slate-600/70 dark:bg-slate-950/50"
            role="group"
            aria-label={t.offres.calculatorPriceModeTitle}
          >
            <button
              type="button"
              onClick={() => setDisplayMode('monthly')}
              className={`min-h-7 min-w-0 flex-1 rounded-[0.3125rem] px-2 py-1 text-center text-xs font-medium leading-snug transition-colors duration-150 sm:flex-none sm:px-2.5 sm:text-sm ${
                displayMode === 'monthly'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100 dark:shadow-none'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              } ${focusRing}`}
            >
              {t.offres.calculatorModeMonthly}
            </button>
            <button
              type="button"
              onClick={() => setDisplayMode('contract_total')}
              className={`min-h-7 min-w-0 flex-1 rounded-[0.3125rem] px-2 py-1 text-center text-xs font-medium leading-snug transition-colors duration-150 sm:flex-none sm:px-2.5 sm:text-sm ${
                displayMode === 'contract_total'
                  ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-800 dark:text-slate-100 dark:shadow-none'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              } ${focusRing}`}
            >
              {t.offres.calculatorModeContractTotal}
            </button>
          </div>

          <div className="min-h-0 flex-1 text-slate-600 dark:text-slate-300">
            {displayMode === 'monthly' ? (
              <div className="space-y-0">
                <div className="space-y-1.5 pb-3">
                  <div className="space-y-1.5">
                    {ladderRow(
                      t.offres.calculatorBlockBasePriceTitle,
                      <>
                        {formatEur(BASE_MONTHLY_MEDIA_EUR[packageId])}
                        {t.offres.calculatorPerMonthSuffix}
                      </>,
                      'tabular-nums text-sm font-medium text-slate-700 dark:text-slate-200',
                      'min-w-0 text-left text-xs font-medium text-slate-500 dark:text-slate-400',
                    )}
                    {isNonZeroEur(monthlyView.month1BaseDiscountEur) ||
                    isNonZeroEur(periodDiscountEurOnBase) ? (
                      <div className="space-y-1 pt-1">
                        <p className={summarySectionHeading}>{t.offres.calculatorAdjustmentsTitle}</p>
                        {isNonZeroEur(monthlyView.month1BaseDiscountEur)
                          ? ladderRow(
                              t.offres.calculatorDiscountFirstMonthLabel,
                              <>−{formatEur(monthlyView.month1BaseDiscountEur)}</>,
                              'tabular-nums text-sm font-normal text-sky-800 dark:text-sky-400/95',
                              'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                            )
                          : null}
                        {isNonZeroEur(periodDiscountEurOnBase)
                          ? ladderRow(
                              t.offres.calculatorPeriodDiscountEurLabel,
                              <>
                                −{formatEur(periodDiscountEurOnBase)}
                                {t.offres.calculatorPerMonthSuffix}
                              </>,
                              'tabular-nums text-sm font-normal text-sky-800 dark:text-sky-400/95',
                              'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                            )
                          : null}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                  <p className={summarySectionHeading}>{t.offres.calculatorPaymentStructureBaseTitle}</p>
                  <div className="mt-2 space-y-1.5">
                    {ladderRow(
                      t.offres.calculatorPriceLineMonth1,
                      formatEur(monthlyView.month1BaseMediaEur),
                      'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                      'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                    )}
                    {ladderRow(
                      t.offres.calculatorPriceLineFromMonth2,
                      <>
                        {formatEur(monthlyView.fromMonth2BaseMediaEur)}
                        {t.offres.calculatorPerMonthSuffix}
                      </>,
                      'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                      'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                    )}
                  </div>
                </div>

                {hasPaidSelection ? (
                  <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                    <p className={summarySectionHeading}>{t.offres.calculatorAddonsTitle}</p>
                    <div className="mt-2 space-y-1.5">
                      {paidLineItems.map((a) => (
                        <div key={a.addonId}>
                          {addonLadderRow(
                            a.addonId,
                            labelForAddon(a, t),
                            formatPaidAddonLine(a),
                            'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                            'text-xs text-slate-500 dark:text-slate-400',
                          )}
                        </div>
                      ))}
                      {isNonZeroEur(addonsMonthlyTotal)
                        ? ladderRow(
                            t.offres.calculatorAddonsMonthlyTotalLabel,
                            <>
                              {formatEur(addonsMonthlyTotal)}
                              {t.offres.calculatorPerMonthSuffix}
                            </>,
                            'tabular-nums text-sm font-medium text-slate-700 dark:text-slate-200',
                            'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                          )
                        : null}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                  <p className={summarySectionHeading}>{t.offres.calculatorPayableTitle}</p>
                  <div className="mt-3 space-y-2.5">
                    {ladderRow(
                      t.offres.calculatorPayableFirstMonth,
                      formatEur(monthlyView.month1TotalEur),
                      'tabular-nums text-lg font-semibold text-slate-900 dark:text-white',
                      'min-w-0 text-left text-sm font-semibold text-slate-800 dark:text-slate-50',
                    )}
                    {ladderRow(
                      t.offres.calculatorPayableFromMonth2,
                      <>
                        {formatEur(monthlyView.fromMonth2TotalEur)}
                        {t.offres.calculatorPerMonthSuffix}
                      </>,
                      'tabular-nums text-lg font-semibold text-slate-900 dark:text-white',
                      'min-w-0 text-left text-sm font-semibold text-slate-800 dark:text-slate-50',
                    )}
                  </div>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-4 dark:border-slate-600/50">
                  {ladderRow(
                    t.offres.calculatorAvgOverContractLabel,
                    <>
                      {formatEur(avgMonthlyRounded)}
                      {t.offres.calculatorPerMonthSuffix}
                    </>,
                    'tabular-nums text-xs font-normal text-slate-500 dark:text-slate-400',
                    'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-0">
                <div className="space-y-1.5 pb-3">
                  {ladderRow(
                    t.offres.calculatorContractTotalLabel,
                    formatEur(contractTotalView.contractTotalEur),
                    'tabular-nums text-sm font-semibold text-slate-800 dark:text-slate-100',
                    'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                  )}
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {t.offres.calculatorResultHeroSubtitleContract.replace('{months}', String(durationMonths))}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                  <p className={summarySectionHeading}>{t.offres.calculatorPaymentStructureTotalsTitle}</p>
                  <div className="mt-2 space-y-1.5">
                    {ladderRow(
                      t.offres.calculatorPriceLineMonth1,
                      formatEur(monthlyView.month1TotalEur),
                      'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                      'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                    )}
                    {ladderRow(
                      t.offres.calculatorPriceLineFromMonth2,
                      <>
                        {formatEur(monthlyView.fromMonth2TotalEur)}
                        {t.offres.calculatorPerMonthSuffix}
                      </>,
                      'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                      'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                    )}
                  </div>
                </div>

                {hasPaidSelection ? (
                  <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                    <p className={summarySectionHeading}>{t.offres.calculatorAddonsTitle}</p>
                    <div className="mt-2 space-y-1.5">
                      {paidLineItems.map((a) => {
                        const line = Math.round(a.chargedMonthlyEur * durationMonths + a.chargedOneTimeEur);
                        return (
                          <div key={a.addonId}>
                            {addonLadderRow(
                              a.addonId,
                              labelForAddon(a, t),
                              formatEur(line),
                              'tabular-nums text-sm font-normal text-slate-600 dark:text-slate-300',
                              'text-xs text-slate-500 dark:text-slate-400',
                            )}
                          </div>
                        );
                      })}
                      {isNonZeroEur(addonsContractTotal)
                        ? ladderRow(
                            t.offres.calculatorAddonsContractTotalLabel,
                            formatEur(addonsContractTotal),
                            'tabular-nums text-sm font-medium text-slate-700 dark:text-slate-200',
                            'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                          )
                        : null}
                    </div>
                  </div>
                ) : null}

                <div className="mt-6 border-t border-slate-200/80 pt-5 dark:border-slate-600/50">
                  <p className={summarySectionHeading}>{t.offres.calculatorPayableTitle}</p>
                  <div className="mt-3 space-y-2.5">
                    {ladderRow(
                      t.offres.calculatorContractPayMonthlyLabel,
                      formatEur(contractTotalEur),
                      'tabular-nums text-lg font-semibold text-slate-900 dark:text-white',
                      'min-w-0 text-left text-sm font-semibold text-slate-800 dark:text-slate-50',
                    )}
                    {isNonZeroEur(prepaidSavingsEur)
                      ? ladderRow(
                          <>
                            {t.offres.calculatorContractPrepaidDiscountLabel} (−{Math.round(prepaidRate * 100)}%)
                          </>,
                          <>−{formatEur(prepaidSavingsEur)}</>,
                          'tabular-nums text-sm font-normal text-sky-800 dark:text-sky-400/95',
                          'min-w-0 text-left text-xs text-slate-500 dark:text-slate-400',
                        )
                      : null}
                    {ladderRow(
                      t.offres.calculatorContractPrepaidTotalLabel,
                      formatEur(prepaidTotalEur),
                      'tabular-nums text-lg font-semibold text-slate-900 dark:text-white',
                      'min-w-0 text-left text-sm font-semibold text-slate-800 dark:text-slate-50',
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <a
            href="#contact"
            className={`mt-4 block w-full flex-shrink-0 rounded-lg bg-gradient-to-b from-sky-600 to-sky-700 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-[filter] duration-150 hover:brightness-105 dark:from-sky-600 dark:to-sky-800 dark:hover:brightness-110 ${focusRing}`}
          >
            {t.offres.ctaEstimation}
          </a>
        </div>
      </div>

      <p className="mt-6 border-t border-slate-100/90 pt-4 text-xs leading-relaxed text-slate-500 dark:border-slate-700/60 dark:text-slate-400">
        {t.offres.simDisclaimer}
      </p>
    </div>
  );
}
