import { Component, computed, inject, input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

// Charte V2 (p. 12) : Material Symbols Rounded, trait 400, non remplies.
// Import `?raw` : chaque SVG est intégré au build (aucun chargement externe, CSP respectée)
// et seules les icônes listées ici partent dans le bundle.
import agriculture from "@material-symbols/svg-400/rounded/agriculture.svg?raw";
import analytics from "@material-symbols/svg-400/rounded/analytics.svg?raw";
import badge from "@material-symbols/svg-400/rounded/badge.svg?raw";
import calendarMonth from "@material-symbols/svg-400/rounded/calendar_month.svg?raw";
import chevronLeft from "@material-symbols/svg-400/rounded/chevron_left.svg?raw";
import infoSvg from "@material-symbols/svg-400/rounded/info.svg?raw";
import csvSvg from "@material-symbols/svg-400/rounded/csv.svg?raw";
import lockSvg from "@material-symbols/svg-400/rounded/lock.svg?raw";
import publicSvg from "@material-symbols/svg-400/rounded/public.svg?raw";
import blockSvg from "@material-symbols/svg-400/rounded/block.svg?raw";
import adminPanelSettingsSvg from "@material-symbols/svg-400/rounded/admin_panel_settings.svg?raw";
import howToRegSvg from "@material-symbols/svg-400/rounded/how_to_reg.svg?raw";
import notificationsActiveSvg from "@material-symbols/svg-400/rounded/notifications_active.svg?raw";
import undoSvg from "@material-symbols/svg-400/rounded/undo.svg?raw";
import contentCopySvg from "@material-symbols/svg-400/rounded/content_copy.svg?raw";
import refreshSvg from "@material-symbols/svg-400/rounded/refresh.svg?raw";
import deleteForeverSvg from "@material-symbols/svg-400/rounded/delete_forever.svg?raw";
import accessibilitySvg from "@material-symbols/svg-400/rounded/accessibility.svg?raw";
import chevronRight from "@material-symbols/svg-400/rounded/chevron_right.svg?raw";
import creditScore from "@material-symbols/svg-400/rounded/credit_score.svg?raw";
import database from "@material-symbols/svg-400/rounded/database.svg?raw";
import dataset from "@material-symbols/svg-400/rounded/dataset.svg?raw";
import description from "@material-symbols/svg-400/rounded/description.svg?raw";
import devices from "@material-symbols/svg-400/rounded/devices.svg?raw";
import diversity3 from "@material-symbols/svg-400/rounded/diversity_3.svg?raw";
import event from "@material-symbols/svg-400/rounded/event.svg?raw";
import eventNote from "@material-symbols/svg-400/rounded/event_note.svg?raw";
import factCheck from "@material-symbols/svg-400/rounded/fact_check.svg?raw";
import folderShared from "@material-symbols/svg-400/rounded/folder_shared.svg?raw";
import group from "@material-symbols/svg-400/rounded/group.svg?raw";
import history from "@material-symbols/svg-400/rounded/history.svg?raw";
import homeWork from "@material-symbols/svg-400/rounded/home_work.svg?raw";
import hub from "@material-symbols/svg-400/rounded/hub.svg?raw";
import inventory2 from "@material-symbols/svg-400/rounded/inventory_2.svg?raw";
import leftPanelClose from "@material-symbols/svg-400/rounded/left_panel_close.svg?raw";
import leftPanelOpen from "@material-symbols/svg-400/rounded/left_panel_open.svg?raw";
import link from "@material-symbols/svg-400/rounded/link.svg?raw";
import manageAccounts from "@material-symbols/svg-400/rounded/manage_accounts.svg?raw";
import map from "@material-symbols/svg-400/rounded/map.svg?raw";
import payments from "@material-symbols/svg-400/rounded/payments.svg?raw";
import pinDrop from "@material-symbols/svg-400/rounded/pin_drop.svg?raw";
import pottedPlant from "@material-symbols/svg-400/rounded/potted_plant.svg?raw";
import queryStats from "@material-symbols/svg-400/rounded/query_stats.svg?raw";
import receiptLong from "@material-symbols/svg-400/rounded/receipt_long.svg?raw";
import schedule from "@material-symbols/svg-400/rounded/schedule.svg?raw";
import sell from "@material-symbols/svg-400/rounded/sell.svg?raw";
import spaceDashboard from "@material-symbols/svg-400/rounded/space_dashboard.svg?raw";
import storefront from "@material-symbols/svg-400/rounded/storefront.svg?raw";
import trendingUp from "@material-symbols/svg-400/rounded/trending_up.svg?raw";
import tune from "@material-symbols/svg-400/rounded/tune.svg?raw";
import uploadFile from "@material-symbols/svg-400/rounded/upload_file.svg?raw";
import verified from "@material-symbols/svg-400/rounded/verified.svg?raw";
import accountBalanceSvg from "@material-symbols/svg-400/rounded/account_balance.svg?raw";
import closeSvg from "@material-symbols/svg-400/rounded/close.svg?raw";
import apartmentSvg from "@material-symbols/svg-400/rounded/apartment.svg?raw";
import gridViewSvg from "@material-symbols/svg-400/rounded/grid_view.svg?raw";
import viewListSvg from "@material-symbols/svg-400/rounded/view_list.svg?raw";
import moreHorizSvg from "@material-symbols/svg-400/rounded/more_horiz.svg?raw";
import archiveSvg from "@material-symbols/svg-400/rounded/archive.svg?raw";
import unarchiveSvg from "@material-symbols/svg-400/rounded/unarchive.svg?raw";
import editSvg from "@material-symbols/svg-400/rounded/edit.svg?raw";
import personAddSvg from "@material-symbols/svg-400/rounded/person_add.svg?raw";
import addBusinessSvg from "@material-symbols/svg-400/rounded/add_business.svg?raw";
import markEmailUnreadSvg from "@material-symbols/svg-400/rounded/mark_email_unread.svg?raw";
import summarizeSvg from "@material-symbols/svg-400/rounded/summarize.svg?raw";
import tableViewSvg from "@material-symbols/svg-400/rounded/table_view.svg?raw";
import visibilitySvg from "@material-symbols/svg-400/rounded/visibility.svg?raw";
import checkSvg from "@material-symbols/svg-400/rounded/check.svg?raw";
import labProfileSvg from "@material-symbols/svg-400/rounded/lab_profile.svg?raw";
import folderOpenSvg from "@material-symbols/svg-400/rounded/folder_open.svg?raw";
import calendarTodaySvg from "@material-symbols/svg-400/rounded/calendar_today.svg?raw";
import accountBalanceWalletSvg from "@material-symbols/svg-400/rounded/account_balance_wallet.svg?raw";
import gavelSvg from "@material-symbols/svg-400/rounded/gavel.svg?raw";
import progressActivitySvg from "@material-symbols/svg-400/rounded/progress_activity.svg?raw";
import fileExportSvg from "@material-symbols/svg-400/rounded/file_export.svg?raw";
import notificationsSvg from "@material-symbols/svg-400/rounded/notifications.svg?raw";
import helpSvg from "@material-symbols/svg-400/rounded/help.svg?raw";
import settingsSvg from "@material-symbols/svg-400/rounded/settings.svg?raw";
import addSvg from "@material-symbols/svg-400/rounded/add.svg?raw";
import downloadSvg from "@material-symbols/svg-400/rounded/download.svg?raw";
import arrowForwardSvg from "@material-symbols/svg-400/rounded/arrow_forward.svg?raw";
import arrowOutwardSvg from "@material-symbols/svg-400/rounded/arrow_outward.svg?raw";
import squareFootSvg from "@material-symbols/svg-400/rounded/square_foot.svg?raw";
import femaleSvg from "@material-symbols/svg-400/rounded/female.svg?raw";
import warningSvg from "@material-symbols/svg-400/rounded/warning.svg?raw";
import checkCircleSvg from "@material-symbols/svg-400/rounded/check_circle.svg?raw";
import mailSvg from "@material-symbols/svg-400/rounded/mail.svg?raw";
import callSvg from "@material-symbols/svg-400/rounded/call.svg?raw";
import menuBookSvg from "@material-symbols/svg-400/rounded/menu_book.svg?raw";
import quizSvg from "@material-symbols/svg-400/rounded/quiz.svg?raw";
import languageSvg from "@material-symbols/svg-400/rounded/language.svg?raw";
import personSvg from "@material-symbols/svg-400/rounded/person.svg?raw";
import logoutSvg from "@material-symbols/svg-400/rounded/logout.svg?raw";
import searchSvg from "@material-symbols/svg-400/rounded/search.svg?raw";
import keyboardArrowDownSvg from "@material-symbols/svg-400/rounded/keyboard_arrow_down.svg?raw";
import northEastSvg from "@material-symbols/svg-400/rounded/north_east.svg?raw";
import southEastSvg from "@material-symbols/svg-400/rounded/south_east.svg?raw";
import eventUpcomingSvg from "@material-symbols/svg-400/rounded/event_upcoming.svg?raw";
import locationOnSvg from "@material-symbols/svg-400/rounded/location_on.svg?raw";
import landscapeSvg from "@material-symbols/svg-400/rounded/landscape.svg?raw";
import grassSvg from "@material-symbols/svg-400/rounded/grass.svg?raw";
import taskAltSvg from "@material-symbols/svg-400/rounded/task_alt.svg?raw";
import supportAgentSvg from "@material-symbols/svg-400/rounded/support_agent.svg?raw";
import openInNewSvg from "@material-symbols/svg-400/rounded/open_in_new.svg?raw";
import accountCircleSvg from "@material-symbols/svg-400/rounded/account_circle.svg?raw";

const ICONS = {
  agriculture,
  analytics,
  badge,
  calendar_month: calendarMonth,
  chevron_left: chevronLeft,
  info: infoSvg,
  csv: csvSvg,
  lock: lockSvg,
  public: publicSvg,
  block: blockSvg,
  admin_panel_settings: adminPanelSettingsSvg,
  how_to_reg: howToRegSvg,
  notifications_active: notificationsActiveSvg,
  undo: undoSvg,
  content_copy: contentCopySvg,
  refresh: refreshSvg,
  delete_forever: deleteForeverSvg,
  accessibility: accessibilitySvg,
  chevron_right: chevronRight,
  credit_score: creditScore,
  database,
  dataset,
  description,
  devices,
  diversity_3: diversity3,
  event,
  event_note: eventNote,
  fact_check: factCheck,
  folder_shared: folderShared,
  group,
  history,
  home_work: homeWork,
  hub,
  inventory_2: inventory2,
  left_panel_close: leftPanelClose,
  left_panel_open: leftPanelOpen,
  link,
  manage_accounts: manageAccounts,
  map,
  payments,
  pin_drop: pinDrop,
  potted_plant: pottedPlant,
  query_stats: queryStats,
  receipt_long: receiptLong,
  schedule,
  sell,
  space_dashboard: spaceDashboard,
  storefront,
  trending_up: trendingUp,
  tune,
  upload_file: uploadFile,
  verified,
  account_balance: accountBalanceSvg,
  close: closeSvg,
  apartment: apartmentSvg,
  grid_view: gridViewSvg,
  view_list: viewListSvg,
  more_horiz: moreHorizSvg,
  archive: archiveSvg,
  unarchive: unarchiveSvg,
  edit: editSvg,
  person_add: personAddSvg,
  add_business: addBusinessSvg,
  mark_email_unread: markEmailUnreadSvg,
  summarize: summarizeSvg,
  table_view: tableViewSvg,
  visibility: visibilitySvg,
  check: checkSvg,
  lab_profile: labProfileSvg,
  folder_open: folderOpenSvg,
  calendar_today: calendarTodaySvg,
  account_balance_wallet: accountBalanceWalletSvg,
  gavel: gavelSvg,
  progress_activity: progressActivitySvg,
  file_export: fileExportSvg,
  notifications: notificationsSvg,
  help: helpSvg,
  settings: settingsSvg,
  add: addSvg,
  download: downloadSvg,
  arrow_forward: arrowForwardSvg,
  arrow_outward: arrowOutwardSvg,
  square_foot: squareFootSvg,
  female: femaleSvg,
  warning: warningSvg,
  check_circle: checkCircleSvg,
  mail: mailSvg,
  call: callSvg,
  menu_book: menuBookSvg,
  quiz: quizSvg,
  language: languageSvg,
  person: personSvg,
  logout: logoutSvg,
  search: searchSvg,
  keyboard_arrow_down: keyboardArrowDownSvg,
  north_east: northEastSvg,
  south_east: southEastSvg,
  event_upcoming: eventUpcomingSvg,
  location_on: locationOnSvg,
  landscape: landscapeSvg,
  grass: grassSvg,
  task_alt: taskAltSvg,
  support_agent: supportAgentSvg,
  open_in_new: openInNewSvg,
  account_circle: accountCircleSvg,
} as const;

export type IconName = keyof typeof ICONS;

/**
 * Icône Material Symbols Rounded : `<ui-icon name="agriculture" [size]="20" />`.
 * Prend la couleur du texte (`currentColor`). Décorative par défaut (`aria-hidden`) :
 * le libellé doit être porté par l'élément parent. Pour ajouter une icône : l'importer ci-dessus.
 */
@Component({
  selector: "ui-icon",
  host: {
    class: "inline-grid shrink-0 place-items-center",
    "aria-hidden": "true",
    "[style.width.px]": "size()",
    "[style.height.px]": "size()",
    "[innerHTML]": "svg()",
  },
  styles: `
    :host ::ng-deep svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
  `,
  template: ``,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input(20);

  private readonly sanitizer = inject(DomSanitizer);
  /** SVG statiques du paquet, connus au build : contenu de confiance. */
  protected readonly svg = computed(() => this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()]));
}
