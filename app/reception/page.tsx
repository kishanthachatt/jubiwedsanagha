import { InvitationShell } from "@/components/invitation/InvitationShell";
import { invitationConfigs } from "@/lib/invitation-config";
import { invitationMetadata } from "@/lib/metadata";

export const metadata = invitationMetadata(invitationConfigs.reception);

export default function ReceptionPage() {
  return <InvitationShell config={invitationConfigs.reception} />;
}
