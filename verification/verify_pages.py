from playwright.sync_api import sync_playwright

def verify_homepage():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_selector("text=Empowering Minds")
            page.screenshot(path="verification/homepage.png")
            print("Homepage screenshot taken.")

            # Navigate to login
            page.click("text=Login")
            page.wait_for_url("**/login")
            page.screenshot(path="verification/login.png")
            print("Login page screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_homepage()
