import { InvitationShell } from "@/components/invitation/InvitationShell";
import { invitationConfigs } from "@/lib/invitation-config";
import { invitationMetadata } from "@/lib/metadata";

export const metadata = invitationMetadata(invitationConfigs.wedding);

export default function WeddingPage() {
  return <InvitationShell config={invitationConfigs.wedding} receptionConfig={invitationConfigs.reception} />;
}
