import { test, expect } from '@playwright/test';

const EXPECTED_OC_ROSTER = [
  { callsign: '9A4M', name: 'Mate Botica', initials: 'MB' },
  { callsign: '9A1UN', name: 'Davor Kucelin', initials: 'DK' },
  { callsign: '9A5W', name: 'Nikola Perčin', initials: 'NP' },
  { callsign: '9A3A', name: 'Ivo Pezer', initials: 'IP' },
  { callsign: '9A2G', name: 'Zlatko Tonković', initials: 'ZT' },
  { callsign: '9A5X', name: 'Darko Martinčević', initials: 'DM' },
  { callsign: '9A5R', name: 'Željko Dražić Karalić', initials: 'ŽK' },
  { callsign: '9A6KX', name: 'Mirko Jurman', initials: 'MJ' },
  { callsign: '9A3XV', name: 'Aleksandar Jugović', initials: 'AJ' },
  { callsign: 'YU1LA', name: 'Ivan Mastilović', initials: 'IM' },
  { callsign: '9A6PAX', name: 'Marija Sorić', initials: 'MS' },
];

test.describe('Story 1.2 — Dynamic Kockice & 9A Airwaves Homepage, OC Roster & Past WRTCs (1990–2026)', () => {
  test('Hero, Live Event #1 Ticker, About WRTC, and Slavonia Venue cards render in Day and Night modes', async ({
    page,
  }) => {
    await page.goto('/');

    // Hero & Kockice Mosaic SVG
    await expect(page.locator('svg.p1-kockice-mosaic')).toBeVisible();
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: /THE OLYMPICS OF AMATEUR RADIO ARRIVES IN CROATIA/i,
      })
    ).toBeVisible();

    // Official Championship Brief card with 9A · CROATIA & CheckerFive
    const briefCard = page.locator('aside.aside-card');
    await expect(briefCard).toBeVisible();
    await expect(briefCard).toContainText('9A · CROATIA');
    await expect(briefCard.locator('.checker-five')).toBeVisible();

    // Live Event #1 Ticker bar
    const ticker = page.locator('.ticker-bar');
    await expect(ticker).toBeVisible();
    await expect(ticker).toContainText('9A DX Contest — Dec 19–20, 2026 UTC');

    // About WRTC section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText('2 operators');
    await expect(aboutSection).toContainText('24h');
    await expect(aboutSection).toContainText('~4M radio amateurs');
    await expect(aboutSection).toContainText('60 identical field stations');

    // Slavonia Host Region preview
    const slavoniaSection = page.locator('#slavonia');
    await expect(slavoniaSection).toBeVisible();
    await expect(slavoniaSection).toContainText('Osijek · Čepin · Đakovo');

    // Toggle to Night mode and verify Hero & Ticker remain visible
    await page.getByRole('button', { name: 'Night', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    await expect(ticker).toBeVisible();
    await expect(briefCard).toBeVisible();
  });

  test('Organizing Committee (#team) and Past WRTC Archive (#past-events) render all 11 OC members and 1990–2026 editions with zero horizontal overflow', async ({
    page,
  }) => {
    await page.goto('/');

    const teamSection = page.locator('#team');
    await teamSection.scrollIntoViewIfNeeded();
    await expect(teamSection).toBeVisible();

    const personCards = teamSection.locator('.person');
    await expect(personCards).toHaveCount(11);

    for (const member of EXPECTED_OC_ROSTER) {
      await expect(teamSection.getByText(member.callsign, { exact: true })).toBeVisible();
      await expect(teamSection.getByText(member.name, { exact: true })).toBeVisible();
    }

    // Past WRTC Archive (#past-events)
    const pastSection = page.locator('#past-events');
    await pastSection.scrollIntoViewIfNeeded();
    await expect(pastSection).toBeVisible();
    await expect(pastSection).toContainText('1990 Seattle');
    await expect(pastSection).toContainText('2026 UK');
    await expect(pastSection).toContainText('K1AR');
    await expect(pastSection).toContainText('DJ5MW');

    const archiveLinks = pastSection.locator('a[target="_blank"]');
    const linkCount = await archiveLinks.count();
    expect(linkCount).toBeGreaterThanOrEqual(9);

    for (let i = 0; i < linkCount; i++) {
      const rel = await archiveLinks.nth(i).getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }

    // Verify zero horizontal overflow at current viewport (Desktop 1440x900 or Mobile 375x812)
    const noOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(noOverflow).toBe(true);

    // Also verify zero horizontal overflow at 320px width
    await page.setViewportSize({ width: 320, height: 568 });
    const noOverflow320 = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth
    );
    expect(noOverflow320).toBe(true);
  });
});
