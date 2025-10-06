from playwright.sync_api import sync_playwright, expect

def run_verification():
    """
    This script verifies the theme functionality of the Hugo site.
    1. It loads the homepage and captures a screenshot in light mode.
    2. It clicks the theme toggle and captures a screenshot in dark mode.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--no-sandbox'])
        page = browser.new_page()

        try:
            # Go to the local development server, wait for network to be idle
            print("Navigating to http://localhost:1313...")
            page.goto("http://localhost:1313", wait_until="networkidle")

            # --- Step 1: Verify Light Mode ---
            print("Verifying light mode...")
            # Check that the default theme is light
            expect(page.locator("html")).to_have_attribute("data-theme", "light")

            # **Crucial Fix**: Wait for the article card to be visible before taking the screenshot.
            # This ensures the content has been rendered.
            print("Waiting for article card to be visible...")
            article_card = page.locator(".article-card").first
            expect(article_card).to_be_visible()
            print("Article card is visible.")

            # Take screenshot of the light mode homepage
            page.screenshot(path="jules-scratch/verification/verification-light.png")
            print("Successfully captured light mode screenshot.")

            # --- Step 2: Switch to Dark Mode ---
            print("Switching to dark mode...")
            # Find the toggle button by its ID and click it
            dark_mode_toggle = page.locator("#darkModeToggle")
            expect(dark_mode_toggle).to_be_visible()
            dark_mode_toggle.click()

            # --- Step 3: Verify Dark Mode ---
            print("Verifying dark mode...")
            # Assert that the theme attribute has changed to 'dark'
            expect(page.locator("html")).to_have_attribute("data-theme", "dark")
            # Wait a moment for CSS transitions to finish before taking the screenshot
            page.wait_for_timeout(500)
            # Take screenshot of the dark mode homepage
            page.screenshot(path="jules-scratch/verification/verification-dark.png")
            print("Successfully captured dark mode screenshot.")

        except Exception as e:
            print(f"An error occurred during verification: {e}")
            # In case of error, take a screenshot for debugging
            page.screenshot(path="jules-scratch/verification/error.png")
        finally:
            browser.close()
            print("Browser closed. Verification script finished.")

if __name__ == "__main__":
    run_verification()