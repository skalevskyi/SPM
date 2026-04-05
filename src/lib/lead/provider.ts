import type { Lead } from './types';
import { sendLeadAutoReply, sendLeadNotification } from './providers/email';

export type DeliverLeadEmailsResult = {
  ownerNotificationOk: boolean;
  /** null when owner notification failed (auto-reply not attempted). */
  autoReplyOk: boolean | null;
};

/**
 * Owner notification first; auto-reply best-effort. Does not throw on email failures —
 * callers use the returned flags for logging. Backup persistence must run before this.
 */
export async function deliverLeadEmails(lead: Lead): Promise<DeliverLeadEmailsResult> {
  try {
    await sendLeadNotification(lead);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      JSON.stringify({
        component: 'deliverLeadEmails',
        event: 'owner_notification_failed',
        message: message.slice(0, 300),
      }),
    );
    return { ownerNotificationOk: false, autoReplyOk: null };
  }

  try {
    await sendLeadAutoReply(lead);
    return { ownerNotificationOk: true, autoReplyOk: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(
      JSON.stringify({
        component: 'deliverLeadEmails',
        event: 'auto_reply_failed',
        message: message.slice(0, 300),
      }),
    );
    return { ownerNotificationOk: true, autoReplyOk: false };
  }
}
