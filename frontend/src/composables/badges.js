/**
 * badges.js
 * ─────────────────────────────────────────────────────────────────────────
 * Single source of truth for all community badge definitions.
 *
 * Imported by:
 *   - LeaderboardView.vue
 *   - CommunityView.vue
 *
 * Each badge has:
 *   id        — unique string key
 *   emoji     — display character
 *   label     — short name
 *   desc      — unlock condition (human-readable)
 *   condition — function(member) → boolean
 *
 * The `member` object shape expected by condition():
 *   { rank, kwhSaved, streak, readings, posts, challenges, zeroPeakDays }
 */

export const BADGE_DEFS = [
  {
    id: 'seedling',
    emoji: '🌱',
    label: 'Seedling',
    desc: 'Joined EcoSave community',
    condition: () => true,
  },
  {
    id: 'solar-rookie',
    emoji: '☀️',
    label: 'Solar Rookie',
    desc: 'Saved 100 kWh total',
    condition: m => m.kwhSaved >= 100,
  },
  {
    id: 'spark',
    emoji: '⚡',
    label: 'Spark',
    desc: 'Maintained a 7-day streak',
    condition: m => m.streak >= 7,
  },
  {
    id: 'consistent',
    emoji: '📅',
    label: 'Consistent',
    desc: 'Submitted 10+ meter readings',
    condition: m => m.readings >= 10,
  },
  {
    id: 'hot-streak',
    emoji: '🔥',
    label: 'Hot Streak',
    desc: 'Maintained a 30-day streak',
    condition: m => m.streak >= 30,
  },
  {
    id: 'top-100',
    emoji: '🏅',
    label: 'Top 100',
    desc: 'Reached community top 100',
    condition: m => m.rank <= 100,
  },
  {
    id: 'challenger',
    emoji: '🥊',
    label: 'Challenger',
    desc: 'Completed 3+ weekly challenges',
    condition: m => m.challenges >= 3,
  },
  {
    id: 'top-10',
    emoji: '💎',
    label: 'Top 10',
    desc: 'Reached community top 10',
    condition: m => m.rank <= 10,
  },
  {
    id: 'solar-hero',
    emoji: '🏆',
    label: 'Solar Hero',
    desc: 'Saved 1 000 kWh total',
    condition: m => m.kwhSaved >= 1000,
  },
  {
    id: 'zero-peak',
    emoji: '🌙',
    label: 'Off-Peak Master',
    desc: 'Zero peak-hour draws for 7 days',
    condition: m => m.zeroPeakDays >= 7,
  },
  {
    id: 'eco-legend',
    emoji: '👑',
    label: 'Eco-Legend',
    desc: 'Rank 1 in the community',
    condition: m => m.rank === 1,
  },
]

/**
 * Returns the subset of BADGE_DEFS that the given member has earned.
 * @param {object} member - must include rank, kwhSaved, streak, readings,
 *                          posts, challenges, zeroPeakDays
 */
export function earnedBadges(member) {
  return BADGE_DEFS.filter(b => b.condition(member))
}
