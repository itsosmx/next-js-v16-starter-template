export async function sendDiscordNotification(content: string, embeds?: Array<{
  title?: string;
  description?: string;
  color?: number;
  fields?: Array<{
    name?: string;
    value?: string;
    inline?: boolean;
  }>;
  timestamp?: string;
}>) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("DISCORD_WEBHOOK_URL is not set");
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        embeds,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send Discord notification:", await response.text());
    }
  } catch (error) {
    console.error("Error sending Discord notification:", error);
  }
}



export async function newUserNotification({ name, email, id }: { name: string, email: string, id: string }) {
  await sendDiscordNotification("👤 New User Signup", [
    {
      title: "New User Registration",
      description: `A new user has joined!`,
      color: 0x5865F2,
      fields: [
        {
          name: "Name",
          value: name || "N/A",
          inline: true,
        },
        {
          name: "Email",
          value: email || "N/A",
          inline: true,
        },
        {
          name: "User ID",
          value: id || "N/A",
          inline: false,
        },
      ],
      timestamp: new Date().toISOString(),
    },
  ]);
}

export async function paymentEvent({ type, id, status }: { type: string, id: string, status: string }) {
  await sendDiscordNotification("💳 Payment Event", [
    {
      title: "Payment Event",
      description: `A payment event has occurred!`,
      color: 0x5865F2,
      fields: [
        {
          name: "Event Type",
          value: type,
          inline: true,
        },
        {
          name: "Event ID",
          value: id,
          inline: true,
        },
        {
          name: "Event Status",
          value: status,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
    },
  ]);
}