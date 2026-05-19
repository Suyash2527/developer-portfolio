// GitHub API integration — fetches repos, contributions, and pinned repos
import type { GitHubRepo, GitHubStats } from "@/types";

const GITHUB_API = "https://api.github.com";
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "yourusername";

async function githubFetch<T>(endpoint: string): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Server-side only token
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const res = await fetch(`${GITHUB_API}${endpoint}`, {
    headers,
    next: { revalidate: 3600 }, // Cache 1h
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const repos = await githubFetch<GitHubRepo[]>(
      `/users/${USERNAME}/repos?sort=updated&per_page=20&type=public`
    );
    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 8);
  } catch {
    return [];
  }
}

export async function getGitHubStats(): Promise<GitHubStats> {
  try {
    const [user, repos] = await Promise.all([
      githubFetch<{
        public_repos: number;
        followers: number;
        following: number;
        name: string;
        bio: string;
        avatar_url: string;
        html_url: string;
      }>(`/users/${USERNAME}`),
      githubFetch<GitHubRepo[]>(
        `/users/${USERNAME}/repos?per_page=100&type=public`
      ),
    ]);

    const totalStars = repos.reduce(
      (acc, r) => acc + (r.stargazers_count || 0),
      0
    );
    const totalForks = repos.reduce(
      (acc, r) => acc + (r.forks_count || 0),
      0
    );

    return {
      totalRepos: user.public_repos,
      totalStars,
      totalForks,
      followers: user.followers,
      following: user.following,
      name: user.name,
      bio: user.bio,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
    };
  } catch {
    return {
      totalRepos: 0,
      totalStars: 0,
      totalForks: 0,
      followers: 0,
      following: 0,
      name: USERNAME,
      bio: "",
      avatarUrl: "",
      profileUrl: `https://github.com/${USERNAME}`,
    };
  }
}
