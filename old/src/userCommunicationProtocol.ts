const commConfig = {
  prefix: "$NIOU",
  sep: "|",
};
export const commPackets = {
  gameLink: "requestGameLink",
};

export function decodeUserCommunication(
  message: string
): { packet: string; args: string[] } | null {
  if (!message.startsWith(commConfig.prefix)) return null;
  const args = message.split(commConfig.sep);
  if (!Object.values(commPackets).includes(args[1])) return null;
  return {
    packet: args[1],
    args: args.slice(2),
  };
}

export async function communicateUser(id: string, packetID: string, args: string[]) {
  await APIClient.postFriendMessage(
    id,
    [commConfig.prefix, packetID, ...args].join(commConfig.sep),
    app.credential.id
  ); // this is the official game api
  return true;
}
