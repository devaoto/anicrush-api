import ky from "ky";

export const ANICRUSH_URL = "https://anicrush.to";
export const ANICRUSH_API_URL = "https://api.anicrush.to";
export const ANICRUSH_STATIC_URL = "https://static.gniyonna.com/media/poster";

export interface UserAgent {
  name: string;
  version: string;
  platform: string;
  device: string;
  userAgent: string;
}

export const USER_AGENTS: UserAgent[] = [
  {
    name: "Chrome",
    version: "120",
    platform: "Windows",
    device: "Desktop",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  },
  {
    name: "Firefox", 
    version: "120",
    platform: "Windows",
    device: "Desktop",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Firefox/120.0",
  },
  {
    name: "Safari",
    version: "17",
    platform: "MacOS",
    device: "Desktop", 
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
  },
  {
    name: "Edge",
    version: "120",
    platform: "Windows",
    device: "Desktop",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
  },
  {
    name: "Chrome",
    version: "120",
    platform: "Android",
    device: "Mobile",
    userAgent: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
  },
  {
    name: "Safari",
    version: "17",
    platform: "iOS", 
    device: "Mobile",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  }
];

export const getRandomUserAgent = (): UserAgent => {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
};

export const getRandomUserAgentHeader = (): {
  'User-Agent': string;
} => {
  const userAgent = getRandomUserAgent();
  return {
    'User-Agent': userAgent.userAgent,
  } as const;
};

export const getRandomUserAgentString = (): string => {
  const userAgent = getRandomUserAgent();
  return userAgent.userAgent;
};

export const anicrush = ky.create({
  prefixUrl: ANICRUSH_URL,
  headers: {
    ...getRandomUserAgentHeader(),
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors', 
    'Sec-Fetch-Site': 'same-origin',
    'x-site': 'anicrush',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const anicrushApi = ky.create({
  prefixUrl: ANICRUSH_API_URL,
  headers: {
    ...getRandomUserAgentHeader(),
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'DNT': '1',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'x-site': 'anicrush',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const reverseString = (str: string): string => {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
};

export const getImage = (path: string, type: "banner" | "poster" = "poster") => {
    /**
     * This function transforms an image path from Anicrush's internal format to a public URL.
     * 
     * Example input path:
     * "bc/d8/bcd84731a3eda4f4a306250769675065/bcd84731a3eda4f4a306250769675065.jpg"
     * 
     * The path has 3 main parts:
     * 1. First two segments ("bc/d8") - These are internal routing segments we don't need
     * 2. Main identifier (bcd84731a3eda4f4a306250769675065) - This needs to be reversed
     * 3. Filename with extension - We only need the extension (.jpg)
     */

    // Remove the first two path segments and reverse the main identifier
    const mainPart = reverseString(path.split('/')[2]);

    // Extract just the file extension (e.g. "jpg")
    const extension = path.split('.').pop();

    // Construct the final URL by combining:
    // - The static CDN URL (ANICRUSH_STATIC_URL)
    // - The reversed identifier
    // - The file extension
    const imageUrl = `${ANICRUSH_STATIC_URL}/${type === "poster" ? "300x400" : "900x600"}/100/${mainPart}.${extension}`;

    return imageUrl;
}

export type Status = "Finished" | "Airing" | "Unknown";

export const formatStatus = (status: number): Status => {
    switch (status) {
        case 1:
            return "Finished";
        case 2:
            return "Airing";
        default:
            return "Unknown";
    }
}